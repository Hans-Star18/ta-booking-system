<?php

namespace App\Services;

use App\Mail\ReservationConfirmationMail;
use App\Models\Reservation;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Midtrans\Config;
use Midtrans\Notification;
use Midtrans\Snap;
use Symfony\Component\HttpFoundation\Response;

class MidtransService
{
    // protected string $serverKey;

    protected bool $isProduction;

    protected bool $isSanitize;

    protected bool $is3ds;

    public function __construct()
    {
        // $this->serverKey    = config('midtrans.serverKey');
        $this->isProduction = config('midtrans.isProduction');
        $this->isSanitize   = config('midtrans.isSanitize');
        $this->is3ds        = config('midtrans.is3ds');

        // Config::$serverKey    = $this->serverKey;
        Config::$isProduction = $this->isProduction;
        Config::$isSanitized  = $this->isSanitize;
        Config::$is3ds        = $this->is3ds;
    }

    public function getSnapToken(
        ?string $serverKey,
        array $transactionDetails,
        array $customerDetails,
        array $items,
        string $finishUrl,
        ?array $enabledPayments = [
            'credit_card',
            'permata_va',
            'bca_va',
            'bni_va',
            'bri_va',
            'echannel',
        ],
        ?int $expiryDuration = 30,
    ): object {
        $serverKey ??= config('midtrans.serverKey');
        Config::$serverKey    = $serverKey;

        try {
            $params = [
                'transaction_details' => $transactionDetails,
                'callbacks'           => [
                    'finish' => $finishUrl,
                ],
                'enabled_payments' => $enabledPayments,
                'credit_card'      => [
                    'secure' => true,
                ],
                'item_details'     => $items,
                'customer_details' => $customerDetails,
                'expiry'           => [
                    'start_time' => now()->format('Y-m-d H:i:s O'),
                    'unit'       => 'minutes',
                    'duration'   => $expiryDuration,
                ],
                'page_expiry' => [
                    'duration' => $expiryDuration,
                    'unit'     => 'minutes',
                ],
            ];

            return Snap::createTransaction($params);
        } catch (Exception $e) {
            logger()->error('Failed to generate snap token: '.$e->getMessage());

            throw new Exception('Failed to generate snap token: '.$e->getMessage());
        }
    }

    public function handleNotification(Request $requestPost)
    {
        try {
            $reservation = Reservation::where('reservation_number', $requestPost->order_id)->firstOrFail();
            $serverKey   = $reservation->hotel?->setting?->midtrans_server_key;

            $serverKey ??= config('midtrans.serverKey');
            Config::$serverKey    = $serverKey;

            $request = new Notification;

            $reservationNumber = $request->order_id;
            $statusCode        = $request->status_code;
            $grossAmount       = $request->gross_amount;
            $signatureKey      = $request->signature_key;

            if (! $this->isValidSignature($reservationNumber, $statusCode, $grossAmount, $signatureKey, $serverKey)) {
                logger()->error('Invalid signature for reservation number: '.$reservationNumber);
                throw new Exception('Invalid signature');
            }

            $transaction = $reservation->transaction;
            $transaction->update([
                'transaction_id' => $request->transaction_id,
                'payment_type'   => $request->payment_type,
                'payment_status' => $request->transaction_status,
            ]);
            $transaction->save();

            try {
                Mail::send(new ReservationConfirmationMail($reservation));
            } catch (\Throwable $th) {
                logger()->error('Error sending reservation confirmation email: '.$th->getMessage());
            }

            if (in_array($request->transaction_status, ['capture', 'settlement', 'success'])) {
                $reservation->update([
                    'status' => Reservation::CONFIRMED,
                ]);
            }
        } catch (ModelNotFoundException $e) {
            logger()->error('Reservation not found for number: '.$reservationNumber);

            return response()->json(
                [
                    'message' => 'Reservation not found',
                    'error'   => $e->getMessage(),
                ],
                Response::HTTP_NOT_FOUND
            );
        } catch (\Throwable $th) {
            logger()->error('Error handling Midtrans notification: '.$th->getMessage());

            return response()->json(
                [
                    'message' => 'Invalid request',
                    'error'   => $th->getMessage(),
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        return response()->json(
            [
                'status'      => 'success',
                'reservation' => $reservation->transaction,
            ],
            Response::HTTP_OK
        );
    }

    protected function isValidSignature(
        string $reservationNumber,
        string $statusCode,
        string $grossAmount,
        string $signatureKey,
        string $serverKey
    ) {
        $stringToHash = $reservationNumber.$statusCode.$grossAmount.$serverKey;

        $calculatedSignature = hash('sha512', $stringToHash);

        return $calculatedSignature === $signatureKey;
    }
}
