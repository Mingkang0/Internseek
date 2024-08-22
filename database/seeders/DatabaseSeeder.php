<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Internship;
use App\Models\Employer;
use App\Models\ContactPerson;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        Internship::factory()->count(10)->create();

        Employer::factory()->count(10)->create();

        ContactPerson::factory()->count(10)->create();

        DB::table('admins')->insert([
            'firstName' => 'admin',
            'lastName' => 'admin',
            'phoneNum' => '012-3456789',
            'email' => 'admin@example.com',
            'password' => bcrypt('1234'),
            'ICNumber' => '011225060012',
            'gender' => 'Male',
        ]);

        DB::table('employers')->insert([
            'companyName' => 'Tech Innovators Inc.',
            'companyEmail' => 'employer@example.com',
            'companyPhone' => '+1-800-555-0101',
            'companyAddress1' => '123 Tech Avenue',
            'companyAddress2' => 'Suite 200',
            'companyPostalCode' => '12345',
            'companyCity' => 'Tech City',
            'companyState' => 'California',
            'companyCountry' => 'United States',
            'companySector' => 'Technology',
            'companySize' => 'Large',
            'companyWebsite' => 'https://www.techinnovators.com',
            'vision' => 'To innovate and lead the tech world.',
            'mission' => 'Empowering businesses with cutting-edge technology solutions.',
            'password' => bcrypt('1234'),
            'companyDescription' => 'Tech Innovators Inc. is a leading technology company that specializes in providing innovative solutions to businesses worldwide.',
            'companyRating' => 'Highly Recommended',
            'registrationStatus' => 'Approved',
            'companyLogo' => 'https://www.techinnovators.com/logo.png',
            'companyType' => 'MNC',
            'businessRegNum' => '123456',
            'businessRegDate' => '2021-01-01',
            'documentType' => 'Certificate of Incorporation',
        ]);

        DB::table('internships')->insert([
            'internshipTitle' => 'Software Developer Intern',
            'internshipDescription' => 'We are looking for a software developer intern to join our team.',
            'internshipRequirement' => 'Must have a strong understanding of software development.',
            'internshipResponsibility' => 'Develop software applications.',
            'internshipDuration' => 6,
            'internshipAllowance' => 1000,
            'startPostingDate' => '2021-08-01',
            'endPostingDate' => '2021-08-31',
            'workingHour' => 8,
            'postingStatus' => 'Published',
            'workingMethod' => 'Remote',
            'studyScope' => 'Software Engineering',
            'employerID' => 21,
        ]);

        DB::table('students')->insert([
            'firstName' => 'student',
            'lastName' => 'student',
            'phoneNum' => '012-3456789',
            'email' => 'student@example.com',
            'password' => bcrypt('1234'),
            'ICNumber' => '01122506060041',
            'dateOfBirth' => '2000-01-01',
            'nationality' => 'Malaysian',
            'gender' => 'Male',
            'profilePicture' => 'https://www.example.com/profile.jpg',
        ]);

        DB::table('students')->insert([
            'firstName' => 'student1',
            'lastName' => 'student1',
            'phoneNum' => '012-3456789',
            'email' => 'student1@example.com',
            'password' => bcrypt('1234'),
            'ICNumber' => '01122506060041',
            'dateOfBirth' => '2000-01-01',
            'nationality' => 'Malaysian',
            'gender' => 'Male',
            'profilePicture' => 'https://www.example.com/profile.jpg',
        ]);
    }

}
