<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Employer;
use Illuminate\Support\Facades\Hash;

class EmployerController extends Controller
{
    public function show(){
        $user = Auth::guard('employer')->user();

        $employer = Employer::findOrFail($user->id);

        return Inertia::render('ManageUserProfile/employer/employerDetails', [
            'employer' => $employer,
        ]);
    }

    public function update(Request $request, $id){

        $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'phoneNum' => 'required|string|max:15',
            'position' => 'required|string|max:255',
            'department' => 'required|string|max:255',
        ]);

        $employer = Employer::findOrFail($id);

        // Update the contact person's details
        $employer->update([
            'firstName' => $request->input('firstName'),
            'lastName' => $request->input('lastName'),
            'phoneNum' => $request->input('phoneNum'),
        ]);
    
        // Update fields not in $fillable manually
        $employer->position = $request->input('position');
        $employer->department = $request->input('department');
        $employer->save();
        

        return back()->with('success', 'Employer details updated successfully.')->with('message', 'Your details updated successfully.');
    }

    public function changePassword(Request $request, $id){

        $user = Auth::guard('employer')->user();

        $request->validate([
            'newPassword' => 'required',
            'confirmPassword' => 'required|same:newPassword',
        ]);

        $employer = Employer::findOrFail($id);

        // Ensure the new password is different from the current one
        if (Hash::check($request->input('newPassword'), $employer->password)) {
            return back()->withErrors(['error' => 'New password must be different from the current password.']);
        }

        $employer->password = bcrypt($request->input('newPassword'));
        $employer->save();

        return redirect()->route('employer.employerdetails')->with('success', 'Password changed successfully.')->with('message', 'Your password has been changed successfully.');
    }
}
