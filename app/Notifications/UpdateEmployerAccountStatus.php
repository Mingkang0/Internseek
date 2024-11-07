<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class UpdateEmployerAccountStatus extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(array $data)
    {
        $this->data= $data;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $url = url('/login');
        return (new MailMessage)
        ->line('Hi!')
        ->subject('Employer Account Status')
        ->line('Your company account status has been updated by your company administrator.')
        ->line($this->data['message'] ?? '')
        ->line('Please login to your account to view the changes.')   
        ->action('Login', $url)    
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
           //
        ];
    }
}
