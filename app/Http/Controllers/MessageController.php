<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Employer;
use App\Models\Student;
use Illuminate\Support\Facades\DB;


class MessageController extends Controller
{
    public function sender()
    {
        return $this->morphTo();
    }

    public function receiver()
    {
        return $this->morphTo();
    }


    public function showChatBox(Request $request)
    {
        $guard = session('userGuard');
        $userRole = session('userRole');
        $sender = Auth::guard($guard)->user();

        $id = $request->route('id');
        $receiverType = $request->query('receiverType'); // Use query() to get query parameters

        $receiver = ($receiverType == 'employer') ? Employer::find($id) : Student::find($id);

        
        $messages = Message::where('sender_id', $sender->id)
                ->where('receiver_id', $receiver->id)
                ->get();


        return Inertia::render('Message/ChatBox', [
            'messages' => $messages,
            'receiver' => $receiver,
            'sender' => $sender,
            'receiverType' => $receiverType,
        ]);
    }
    
    public function sendMessage(Request $request){
        $guard = session('userGuard');
        $userRole = session('userRole');
        $sender = Auth::guard($guard)->user();

        $id = $request->route('id');
        $request->validate([
            'message' => 'required|string',
            'image' => 'nullable|image|max:2048', // Validate the image file
            'file' => 'nullable|mimes:pdf,doc,docx|max:2048', // Validate other files
        ]);
    
        $message = new Message();
        $message->messageDetails = $request->input('message');
    
        // Handle image upload
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('public/messages/images');
            $message->messageImage = basename($imagePath); // Save the filename
        }
    
        // Handle file upload
        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('public/messages/files');
            $message->messageDocument = basename($filePath); // Save the filename
        }
    
        // Save other details
        $message->sender_id = $sender->id;
        $message->sender_type = $userRole; 
        $message->receiver_id = $request->input('receiver_id');
        $message->receiver_type = $request->input('receiver_type');
        $message->save();
    
        return redirect()->back();
    }

    public function getMessages(Request $request)
    {
        $userRole = session('userRole');
    
        if ($userRole === 'admin') {
            // Admins cannot use this feature, redirect them to a different page
            return redirect()->route('admin.dashboard');
        }
    
        // Retrieve all conversation partners
        $conversationPartners = Message::where(function ($query) {
            $query->where('receiver_id', Auth::id())
                  ->orWhere('sender_id', Auth::id());
        })
        ->distinct()
        ->get(['sender_id', 'receiver_id']);
    
        $conversations = [];

        foreach ($conversationPartners as $partner) {
            $messages = Message::where(function ($query) use ($partner) {
                $query->where('receiver_id', $partner->receiver_id)
                      ->where('sender_id', $partner->sender_id);
            })
            ->orWhere(function ($query) use ($partner) {
                $query->where('receiver_id', $partner->sender_id)
                      ->where('sender_id', $partner->receiver_id);
            })
            ->orderBy('created_at', 'desc')
            ->get();

            $partnerId = ($partner->sender_id == Auth::id()) ? $partner->receiver_id : $partner->sender_id;
            $partner = ($userRole === 'student') ? Employer::find($partnerId) : Student::find($partnerId);


            $conversations[] = [
                'messages' => $messages,
                'partner' => $partner,
            ];
        }

    
        return Inertia::render('Message/messagePage', [
            'conversations' => $conversations,
            'userRole' => $userRole,
            'userID' => Auth::id(),
        ]);
    }
}