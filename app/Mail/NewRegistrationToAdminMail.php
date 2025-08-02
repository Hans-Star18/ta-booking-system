<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewRegistrationToAdminMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;

    public $hotel;

    public $password;

    public function __construct($user, $hotel, $password)
    {
        $this->user     = $user;
        $this->hotel    = $hotel;
        $this->password = $password;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            from: env('MAIL_FROM_ADDRESS'),
            subject: 'New Registration Mail',
            to: [
                'agussuardiasa1231@gmail.com',
            ],
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'mails.new-registration-to-admin-mail',
            with: [
                'user'     => $this->user,
                'hotel'    => $this->hotel,
                'password' => $this->password,
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
