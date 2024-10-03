<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;


class CompanyRegistrationStatus extends Notification
{
    use Queueable;

    private $data;
    /**
     * Create a new notification instance.
     */
    public function __construct(array $data)
    {
        $this-> data = $data;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database', 'mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $url = url('/login');
        return (new MailMessage)
            ->line('Hi!')
            ->subject('Company Registration Status')
            ->line($this->data['message'] ?? '')
            ->line('Status: ' . $this->data['registrationStatus'] ?? '')
            ->line('Comment: ' . $this->data['inquiryComment'] ?? '')
            ->action('Login', $url )
            ->line("If you didn't request this, please ignore this email.")
            ->line('Thank you!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'message' => $this->data['message'] ?? '',
            'registrationStatus' => $this->data['registrationStatus'] ?? '',
            'inquiryComment' => $this->data['inquiryComment'] ?? '',
        ];
    }
}
