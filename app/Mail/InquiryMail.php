<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class InquiryMail extends Mailable
{
    use Queueable, SerializesModels;

    public $inquiry;

    public function __construct($inquiry)
    {
        $this->inquiry = $inquiry;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            from: env('MAIL_FROM_ADDRESS'),
            subject: 'Inquiry Mail',
            to: [
                'agussuardiasa1231@gmail.com',
            ],
            replyTo: [
                $this->inquiry['email'],
            ],
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'mails.inquiry-mail',
            with: [
                'inquiry' => $this->inquiry,
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
