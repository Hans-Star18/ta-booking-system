<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ApprovalMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;

    public $hotel;

    public function __construct($user, $hotel)
    {
        $this->user  = $user;
        $this->hotel = $hotel;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            from: env('MAIL_FROM_ADDRESS'),
            subject: 'Hotel Approved Mail',
            to: [
                $this->user['email'],
            ],
            bcc: [
                'agussuardiasa1231@gmail.com',
            ]
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'mails.approval-mail',
            with: [
                'user'  => $this->user,
                'hotel' => $this->hotel,
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
