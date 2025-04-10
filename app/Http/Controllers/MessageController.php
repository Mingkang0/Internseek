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

        return Inertia::render('ManageMessagingFeatures/ChatBox', [
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
    // Determine the sender based on the user role
    $guard = session('userGuard');
    $sender = Auth::guard($guard)->user();
    $employerID = null;

    if ($sender instanceof Employer) {
        $employerID = $sender->id;
        $sender = Company::find($sender->companyID); // Set sender as Company
        $userID = $sender->id;

        // Normalize sender and receiver pairs
        $conversationPartners = Message::where(function ($query) use ($sender) {
            $query->where(function ($q) use ($sender) {
                $q->where('sender_id', $sender->id)
                  ->where('sender_type', 'employer'); // Employer sending
            })->orWhere(function ($q) use ($sender) {
                $q->where('receiver_id', $sender->id)
                  ->where('receiver_type', 'employer'); // Employer receiving
            });
        })
        // Normalize conversation pairs using LEAST and GREATEST
        ->selectRaw('DISTINCT LEAST(sender_id, receiver_id) AS partner1, GREATEST(sender_id, receiver_id) AS partner2')
        ->get();

        $conversations = [];
        foreach ($conversationPartners as $partner) {
            $partnerId = ($partner->partner1 == $userID) ? $partner->partner2 : $partner->partner1;

            // Retrieve messages for the unique conversation pair
            $messages = Message::where(function ($query) use ($sender, $partnerId) {
                $query->where('sender_id', $sender->id)
                      ->where('receiver_id', $partnerId);
            })
            ->orWhere(function ($query) use ($sender, $partnerId) {
                $query->where('sender_id', $partnerId)
                      ->where('receiver_id', $sender->id);
            })
            ->orderBy('created_at', 'desc')
            ->with('employer') // Eager-load employer relation if applicable
            ->get();

            // Assuming partner is a Student
            $partner = Student::find($partnerId);

            $conversations[] = [
                'messages' => $messages,
                'partner' => $partner,
            ];
        }

        return Inertia::render('ManageMessagingFeatures/messagePage', [
            'conversations' => $conversations,
            'userRole' => $userRole,
            'userID' => $userID,
        ]);

    } else {
        // For Student
        $userID = $sender->id;

        // Normalize sender and receiver pairs
        $conversationPartners = Message::where(function ($query) use ($sender) {
            $query->where(function ($q) use ($sender) {
                $q->where('sender_id', $sender->id)
                  ->where('sender_type', 'student'); // Student sending
            })->orWhere(function ($q) use ($sender) {
                $q->where('receiver_id', $sender->id)
                  ->where('receiver_type', 'student'); // Student receiving
            });
        })
        // Normalize conversation pairs using LEAST and GREATEST
        ->selectRaw('DISTINCT LEAST(sender_id, receiver_id) AS partner1, GREATEST(sender_id, receiver_id) AS partner2')
        ->get();

        $conversations = [];
        foreach ($conversationPartners as $partner) {
            $partnerId = ($partner->partner1 == $userID) ? $partner->partner2 : $partner->partner1;

            // Retrieve messages for the unique conversation pair
            $messages = Message::where(function ($query) use ($sender, $partnerId) {
                $query->where('sender_id', $sender->id)
                      ->where('receiver_id', $partnerId);
            })
            ->orWhere(function ($query) use ($sender, $partnerId) {
                $query->where('sender_id', $partnerId)
                      ->where('receiver_id', $sender->id);
            })
            ->orderBy('created_at', 'desc')
            ->with('employer') // Eager-load company relation if applicable
            ->get();

            // Assuming partner is a Company
            $partner = Company::find($partnerId);

            $conversations[] = [
                'messages' => $messages,
                'partner' => $partner,
            ];
        }

        return Inertia::render('ManageMessagingFeatures/messagePage', [
            'conversations' => $conversations,
            'userRole' => $userRole,
            'userID' => $userID,
        ]);
    }
}

public function markAsRead(Request $request, $id)
{
  // Validate the incoming request
  $validatedData = $request->validate([
    'messageIds' => 'required|array',
    'messageIds.*' => 'exists:messages,id', // Ensure IDs exist in the messages table
]);

// Retrieve the messages and update their read status
$userGuard = session('userGuard');
$user = Auth::guard($userGuard)->user();

// Determine the user ID based on the user type (Employer or Student)
if ($user instanceof Employer) {
    $userID = $user->companyID;
} else {
    $userID = $user->id;
}

// Update the message status in the database
Message::whereIn('id', $validatedData['messageIds'])
    ->where('receiver_id', $userID)
    ->where('receiver_type', $userGuard)
    ->update(['messageStatus' => 'read']);
}
}