<?php

namespace App\Services;

use Midtrans\Config;
use Midtrans\Snap;
use Exception;

class MidtransService
{
    protected string $serverKey;
    protected bool $isProduction;
    protected bool $isSanitize;
    protected bool $is3ds;

    public function __construct()
    {
        $this->serverKey = config('midtrans.serverKey');
        $this->isProduction = config('midtrans.isProduction');
        $this->isSanitize = config('midtrans.isSanitize');
        $this->is3ds = config('midtrans.is3ds');

        Config::$serverKey = $this->serverKey;
        Config::$isProduction = $this->isProduction;
        Config::$isSanitized = $this->isSanitize;
        Config::$is3ds = $this->is3ds;
    }

    public function getSnapToken(
        array $transactionDetails,
        array $customerDetails,
        array $items,
        string $finishUrl,
        array $enabledPayments = [
            "credit_card",
            "permata_va",
            "bca_va",
            "bni_va",
            "bri_va",
            "echannel",
        ],
        int $expiryDuration = 30
    ): string {
        try {
            $params = [
                'transaction_details' => $transactionDetails,
                'callbacks' => [
                    'finish' => $finishUrl
                ],
                'enabled_payments' => $enabledPayments,
                'credit_card' => [
                    'secure' => true,
                ],
                'item_details' => $items,
                'customer_details' => $customerDetails,
                'expiry' => [
                    'start_time' => now()->format('Y-m-d H:i:s O'),
                    'unit' => 'minutes',
                    'duration' => $expiryDuration,
                ],
                'page_expiry' => [
                    'duration' => $expiryDuration,
                    'unit' => 'minutes'
                ],
            ];

            return Snap::getSnapToken($params);
        } catch (Exception $e) {
            logger()->error('Failed to generate snap token: ' . $e->getMessage());

            throw new Exception('Failed to generate snap token: ' . $e->getMessage());
        }
    }
}
