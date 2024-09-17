<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\URL;

class ForgotPassword extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct($token, $role)
    {
        $this->token = $token;
        $this->role = $role;
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
        $url = URL::temporarySignedRoute('reset-password', now()->addHours(12) ,['token' => $this->token, 'role' => $notifiable->getRole()]);
        return (new MailMessage)
                    ->line('Hi!')
                    ->subject('Reset Password')
                    ->line('You are receiving this email so you can reset the password for your account')
                    ->action('Reset Password', $url )
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
