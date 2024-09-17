<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Employer;
use App\Models\ContactPerson;
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

        // Check if the sender is a ContactPerson and get the employer
        if ($sender instanceof ContactPerson) {
            $contactPersonID = $sender->id; // Get the ContactPerson's ID
            $sender = Employer::find($sender->employerID); // Set sender as Employer
        } else {
        $contactPersonID = null; // Not a contact person
        }

        $id = $request->route('id');
        $receiverType = $request->query('receiverType'); // Use query() to get query parameters

        $receiver = ($receiverType == 'employer') ? Employer::find($id) : Student::find($id);

        
        $messages = Message::where(function ($query) use ($sender, $contactPersonID, $receiver) {
            // If the sender is an employer or has a contact person, include contact_person_id
            if ($sender instanceof Employer && $contactPersonID) {
                $query->where('sender_id', $sender->id)
                      ->where('receiver_id', $receiver->id)
                      ->where('contactPersonID', $contactPersonID); // Only include if the sender is via contact person
            } else {
                // If the sender is a student, or contact person isn't applicable, ignore contact_person_id
                $query->where('sender_id', $sender->id)
                      ->where('receiver_id', $receiver->id);
            }
        })
        ->orWhere(function ($query) use ($sender, $receiver) {
            // Check for the reverse case (when the student is the sender)
            $query->where('receiver_id', $sender->id)
                  ->where('sender_id', $receiver->id);
        })
        ->with('contactPerson') // Eager-load the ContactPerson relationship
        ->get();

        return Inertia::render('Message/ChatBox', [
            'messages' => $messages,
            'receiver' => $receiver,
            'sender' => $sender,
            'receiverType' => $receiverType,
            'contactPersonID' => $contactPersonID,
        ]);
    }
    
    public function sendMessage(Request $request){
        // Get the current authenticated user and their role
        $guard = session('userGuard');
        $userRole = session('userRole');
        $sender = Auth::guard($guard)->user();

    
        // If the sender is a ContactPerson, set the contactPersonID and find the associated Employer
        if ($sender instanceof ContactPerson) {
            $contactPersonID = $sender->id; // ContactPerson's ID
            $sender = Employer::find($sender->employerID); // Set sender as Employer
        } else {
            $contactPersonID = null; // Not a contact person
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
        if ($contactPersonID) {
            $message->contactPersonID = $contactPersonID;
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

    // Determine the sender (either Employer or ContactPerson)
    $guard = session('userGuard');
    $sender = Auth::guard($guard)->user();
    $contactPersonID = null;

    if ($sender instanceof ContactPerson) {
        $contactPersonID = $sender->id;
        $sender = Employer::find($sender->employerID); // Set sender as Employer
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
        ->with('contactPerson') // Eager-load ContactPerson relation if applicable
        ->get();

        // Fetch the partner details based on role
        $partner = ($userRole === 'student') ? Employer::find($partnerId) : Student::find($partnerId);
        
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
}