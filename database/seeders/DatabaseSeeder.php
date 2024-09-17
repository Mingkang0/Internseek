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




        DB::table('admins')->insert([
            'firstName' => 'admin',
            'lastName' => 'admin',
            'phoneNum' => '012-3456789',
            'email' => 'admin@example.com',
            'password' => bcrypt('1234'),
            'ICNumber' => '011225060012',
            'gender' => 'Male',
        ]);

        DB::table('admins')->insert([
            'firstName' => 'admin',
            'lastName' => 'admin',
            'phoneNum' => '012-3456789',
            'email' => 'shoning858@gmail.com',
            'password' => bcrypt('1234'),
            'ICNumber' => '011225060012',
            'gender' => 'Male',
            'reset_password_token' => null,
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
            'inquiryComment' => 'Required change profile details',
            'companyWebsite' => 'https://www.techinnovators.com',
            'vision' => 'To innovate and lead the tech world.',
            'mission' => 'Empowering businesses with cutting-edge technology solutions.',
            'companyDescription' => 'Tech Innovators Inc. is a leading technology company that specializes in providing innovative solutions to businesses worldwide.',
            'companyRating' => 'Highly Recommended',
            'registrationStatus' => 'Approved',
            'companyLogo' => 'https://www.techinnovators.com/logo.png',
            'companyType' => 'MNC',
            'businessRegNum' => '123456',
            'businessRegDate' => '2021-01-01',
            'documentType' => 'Certificate of Incorporation',
            'documentName' => 'Tech Innovators Inc.',
        ]);

        
        DB::table('contact_persons')->insert([
            'firstName' => 'John',
            'lastName' => 'Doe',
            'phoneNum' => '012-3456789',
            'email' => 'employer@example.com',
            'position' => 'HR Manager',
            'department' => 'Human Resources',
            'password' => bcrypt('1234'),
            'employerID' => 1,
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
            'employerID' => 1,
            'createdBy' => 1,
            'lastEditedBy' => 1,
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



        DB::table('skills')->insert([[
            'studentID' => 1,
            'skillDesc' => 'Web Development',
            'proficiencyLevel' => 'Intermediate',
        ],
        [
            'studentID' => 1,
            'skillDesc' => 'Mobile Development',
            'proficiencyLevel' => 'Intermediate',
        ],
        [
            'studentID' => 1,
            'skillDesc' => 'Database Management',
            'proficiencyLevel' => 'Intermediate',
        ]]);

        DB::table('languages')->insert([[
            'studentID' => 1,
            'languageName' => 'English',
            'proficiencyLevel' => 'Intermediate',
        ],
        [
            'studentID' => 1,
            'languageName' => 'Malay',
            'proficiencyLevel' => 'Intermediate',
        ],
        [
            'studentID' => 1,
            'languageName' => 'Mandarin',
            'proficiencyLevel' => 'Intermediate',
        ]]);


        DB::table('accomplishments')->insert([
            [
            'studentID' => 1,
            'accomplishmentName' => 'Hackathon Winner',
            'accomplishmentDescription' => 'Won the first prize in the annual hackathon competition.',
            'accomplishmentYear' => '2021',
        ],
        [
            'studentID' => 1,
            'accomplishmentName' => 'Dean List',
            'accomplishmentDescription' => 'Achieved the Dean List award for academic excellence.',
            'accomplishmentYear' => '2021',
        ],
        [
            'studentID' => 1,
            'accomplishmentName' => 'Best Student Award',
            'accomplishmentDescription' => 'Awarded as the best student in the faculty.',
            'accomplishmentYear' => '2021',
        ]
    ]);

        DB::table('experiences') ->insert([
            [
            'studentID' => 1,
            'jobTitle' => 'Software Developer',
            'companyName' => 'Tech Innovators Inc.',
            'jobDescription' => 'Developed software applications for clients.',
            'startDate' => '2021-01-01',
            'endDate' => '2021-06-30',
        ],
        [
            'studentID' => 1,
            'jobTitle' => 'Web Developer',
            'companyName' => 'Web Solutions Sdn. Bhd.',
            'jobDescription' => 'Developed websites for clients.',
            'startDate' => '2020-01-01',
            'endDate' => '2020-06-30',
        ],
        [
            'studentID' => 1,
            'jobTitle' => 'Mobile Developer',
            'companyName' => 'Mobile Apps Sdn. Bhd.',
            'jobDescription' => 'Developed mobile applications for clients.',
            'startDate' => '2019-01-01',
            'endDate' => '2019-06-30',
        ]
    ]);

        DB::table('referees') ->insert([[
            'studentID' => 1,
            'refereeName' => 'John Doe',
            'refereePosition' => 'Senior Software Developer',
            'refereeCompany' => 'Tech Innovators Inc.',
            'refereeEmail' => 'example@example.com',
            'refereePhone' => '012-3456789',
        ],
        [
            'studentID' => 1,
            'refereeName' => 'Jane Doe',
            'refereePosition' => 'Senior Web Developer',
            'refereeCompany' => 'Web Solutions Sdn. Bhd.',
            'refereeEmail' => 'example@example.com',
            'refereePhone' => '012-3456789',
        ],
        [
            'studentID' => 1,
            'refereeName' => 'Jack Doe',
            'refereePosition' => 'Senior Mobile Developer',
            'refereeCompany' => 'Mobile Apps Sdn. Bhd.',
            'refereeEmail' => 'example@example.com',
            'refereePhone' => '012-3456789',
        ]
    ]);

        DB::table('educations') ->insert([[
            'studentID' => 1,
            'schoolName' => 'University of Tech',
            'educationLevel' => 'Degree',
            'programName' => 'Computer Science',
            'studyField' => 'Software Engineering',
            'CGPA' => '3.5',
            'startDate' => '2018-01-01',
            'endDate' => '2021-06-30',
        ],
        [
            'studentID' => 1,
            'schoolName' => 'Tech College',
            'educationLevel' => 'Diploma',
            'programName' => 'Information Technology',
            'studyField' => 'Web Development',
            'CGPA' => '3.5',
            'startDate' => '2015-01-01',
            'endDate' => '2017-06-30',
        ]
    ]);

        DB::table('addresses')->insert([
            [
            'studentID' => 1,
            'address1' => '123 Tech Avenue',
            'address2' => 'Suite 200',
            'type' => 'home',
            'city' => 'Tech City',
            'state' => 'California',
            'postcode' => '12345',
        ],
        [
            'studentID' => 1,
            'address1' => '456 Tech Avenue',
            'address2' => 'Suite 300',
            'type' => 'training',
            'city' => 'Tech City',
            'state' => 'California',
            'postcode' => '12345',
        ]
    ]);

    }

}