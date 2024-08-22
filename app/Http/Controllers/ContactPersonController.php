<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\ContactPerson;
use Illuminate\Support\Facades\Hash;

class ContactPersonController extends Controller
{
    public function show(){
        $user = Auth::guard('employer')->user();

        $contactPerson = ContactPerson::findOrFail($user->id);

        return Inertia::render('Profile/employer/contactPersonDetails', [
            'contactPerson' => $contactPerson,
        ]);
    }

    public function update(Request $request, $id){

        $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phoneNum' => 'required|string|max:15',
            'position' => 'required|string|max:255',
            'department' => 'required|string|max:255',
        ]);

        $contactPerson = ContactPerson::findOrFail($id);

        // Update the contact person's details
        $contactPerson->update([
            'firstName' => $request->input('firstName'),
            'lastName' => $request->input('lastName'),
            'email' => $request->input('email'),
            'phoneNum' => $request->input('phoneNum'),
        ]);

        $contactPerson->update([
            'firstName' => $request->input('firstName'),
            'lastName' => $request->input('lastName'),
            'email' => $request->input('email'),
            'phoneNum' => $request->input('phoneNum'),
        ]);
    
        // Update fields not in $fillable manually
        $contactPerson->position = $request->input('position');
        $contactPerson->department = $request->input('department');
        $contactPerson->save();
    
        

        return back()->with('success', 'Contact person details updated successfully.')->with('message', 'Your details updated successfully.');
    }

    public function changePassword(Request $request, $id){

        $user = Auth::guard('employer')->user();

        $request->validate([
            'newPassword' => 'required',
            'confirmPassword' => 'required|same:newPassword',
        ]);

        $contactPerson = ContactPerson::findOrFail($id);

        // Ensure the new password is different from the current one
        if (Hash::check($request->input('newPassword'), $contactPerson->password)) {
        return back()->withErrors(['error' => 'New password must be different from the current password.']);
        }

        $contactPerson->password = bcrypt($request->input('newPassword'));
        $contactPerson->save();

        return redirect()->route('employer.contactpersondetails')->with('success', 'Password changed successfully.')->with('message', 'Your password has been changed successfully.');
    }
}