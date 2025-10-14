<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ReservationConfirmationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $reservation;

    public function __construct($reservation)
    {
        $this->reservation  = $reservation;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            from: env('MAIL_FROM_ADDRESS'),
            subject: 'Reservation Confirmation',
            to: [
                $this->reservation->reservationCustomer->email,
            ],
            bcc: [
                'agussuardiasa1231@gmail.com',
            ]
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'mails.reservation-confirmation',
            with: [
                'reservation' => $this->reservation,
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
