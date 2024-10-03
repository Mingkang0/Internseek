<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Employer;
use App\Models\Company;
use App\Models\Student;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;



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

        // Check if the sender is using a company account by checking the employerID
        if ($sender instanceof Employer) {
            $employerID = $sender->id;
            $sender = Company::find($sender->companyID); // Set sender as Company
        } else {
        $employerID = null;
        }

        $id = $request->route('id');
        $receiverType = $request->query('receiverType'); // Use query() to get query parameters

        $receiver = ($receiverType == 'employer') ? Company::find($id) : Student::find($id);

        
        $messages = Message::where(function ($query) use ($sender, $employerID, $receiver) {
            // If the sender is using company, check for the employerID
            if ($sender instanceof Company && $employerID) {
                $query->where('sender_id', $sender->id)
                      ->where('receiver_id', $receiver->id)
                      ->where('employerID', $employerID); // Only include if the sender is an employer
            } else {
                // If the sender is a student, check for the student ID
                $query->where('sender_id', $sender->id)
                      ->where('receiver_id', $receiver->id);
            }
        })
        ->orWhere(function ($query) use ($sender, $receiver) {
            // Check for the reverse case (when the student is the sender)
            $query->where('receiver_id', $sender->id)
                  ->where('sender_id', $receiver->id);
        })
        ->with('employer') // Eager-load employer relation if applicable
        ->get();

        return Inertia::render('Message/ChatBox', [
            'messages' => $messages,
            'receiver' => $receiver,
            'sender' => $sender,
            'receiverType' => $receiverType,
            'employerID' => $employerID,
        ]);
    }
    
    public function sendMessage(Request $request){
        // Get the current authenticated user and their role
        $guard = session('userGuard');
        $userRole = session('userRole');
        $sender = Auth::guard($guard)->user();

    
        // If the sender is using a company account, check for the employerID
        if ($sender instanceof Employer) {
            $employerID = $sender->id;
            $sender = Company::find($sender->companyID); // Set sender as Company
        } else {
            $employerID = null;
        }
    
        // Validate the message input, image, and file
        $request->validate([
            'message' => 'required|string',
            'receiver_id' => 'required|integer', // Ensure receiver ID is provided
            'receiver_type' => 'required|string', // Ensure receiver type is provided (student/employer)
            'image' => 'nullable|image|max:2048', // Validate the image file (optional)
            'file' => 'nullable|mimes:pdf,doc,docx|max:2048', // Validate document file (optional)
        ]);
    

        // Create a new message instance
        $message = new Message();
        $message->messageDetails = $request->input('message');
    
        // Handle image upload, if provided
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('public/messages/images');
            $message->messageImage = basename($imagePath); // Save the filename (without path)
        }
    
        // Handle file upload, if provided
        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('public/messages/files');
            $message->messageDocument = basename($filePath); // Save the filename (without path)
        }
    
        // Assign sender and receiver details
        $message->sender_id = $sender->id;
        $message->sender_type = $userRole; // Use session-stored role (student/employer)
        $message->receiver_id = $request->input('receiver_id');
        $message->receiver_type = $request->input('receiver_type');


        // If the sender is a contact person, attach their ID
        if ($employerID) {
            $message->employerID = $employerID;
        }
    
        // Save the message
        $message->save();
    
        // Optionally, you can set a flash message for feedback
        return redirect()->back();
    }

    public function getMessages(Request $request)
{
    $userRole = session('userRole');

    if ($userRole === 'admin') {
        // Admins cannot use this feature, redirect them to a different page
        return redirect()->route('admin.dashboard');
    }

    // Determine the sender based on the user role
    $guard = session('userGuard');
    $sender = Auth::guard($guard)->user();
    $employerID = null;

    if ($sender instanceof Employer) {
        $employerID = $sender->id;
        $sender = Company::find($sender->companyID); // Set sender as Company
        $userID = $sender->id;
    } else {
        $userID = $sender->id;
    }

    // Retrieve all unique conversation partners
    $conversationPartners = Message::where(function ($query) use ($sender) {
            $query->where('sender_id', $sender->id)
                  ->orWhere('receiver_id', $sender->id);
        })
        ->distinct()
        ->get(['sender_id', 'receiver_id']);


    $conversations = [];

    foreach ($conversationPartners as $partner) {
        $partnerId = ($partner->sender_id == $sender->id) ? $partner->receiver_id : $partner->sender_id;

        // Ensure each conversation is only retrieved once
        $messages = Message::where(function ($query) use ($sender, $partnerId) {
            $query->where(function ($q) use ($sender, $partnerId) {
                $q->where('sender_id', $sender->id)
                  ->where('receiver_id', $partnerId);
            })
            ->orWhere(function ($q) use ($sender, $partnerId) {
                $q->where('sender_id', $partnerId)
                  ->where('receiver_id', $sender->id);
            });
        })
        ->orderBy('created_at', 'desc')
        ->with('employer') // Eager-load employer relation if applicable
        ->get();

        // Fetch the partner details based on role
        $partner = ($userRole === 'student') ? Company::find($partnerId) : Student::find($partnerId);
        
        // Add each conversation to the array
        $conversations[] = [
            'messages' => $messages,
            'partner' => $partner,
        ];
    }

    return Inertia::render('Message/messagePage', [
        'conversations' => $conversations,
        'userRole' => $userRole,
        'userID' => $userID,
    ]);
}

public function markAsRead(Request $request, $id)
{
    // Retrieve the message and update the read status
    $message = Message::find($id);
    if ($message->receiver_id == $request->user()->id) {
        $message->messageStatus = 'read';
        $message->save();
    }
    
}
}