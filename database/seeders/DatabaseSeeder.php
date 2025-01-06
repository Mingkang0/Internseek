<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Internship;
use App\Models\Employer;
use App\Models\Company;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {


        DB::table('employers')->insert([
            'firstName' => 'John Tan',
            'lastName' => 'Ah Kow',
            'phoneNum' => '0199885495',
            'email' => 'shominkang@gmail.com',
            'password' => bcrypt('test1234'),
        ]);



        DB::table('admins')->insert([
            'firstName' => 'Sho',
            'lastName' => 'Ming Kang',
            'phoneNum' => '012-3456789',
            'email' => 'shoning858@gmail.com',
            'password' => bcrypt('test1234'),
            'ICNumber' => '011225060041',
            'gender' => 'Male',
            'reset_password_token' => null,
        ]);

        DB::table('students')->insert([
            'firstName' => 'Sho',
            'lastName' => 'Ming Kang',
            'phoneNum' => '012-3456789',
            'email' => 'shomingkang@gmail.com',
            'password' => bcrypt('test1234'),
            'ICNumber' => '01122506060041',
            'dateOfBirth' => '2001-12-25',
            'nationality' => 'Malaysian Citizen',
            'gender' => 'Male',
        ]);


        DB::table('students')->insert([
            'firstName' => 'Oh',
            'lastName' => 'Hoa Yang',
            'phoneNum' => '0164227223',
            'email' => 'cb21048@adab.umpsa.edu.my',
            'password' => bcrypt('test1234'),
            'ICNumber' => '020115075123',
            'dateOfBirth' => '2002-01-15',
            'nationality' => 'Malaysian Citizen',
            'gender' => 'Male',
        ]);

        DB::table('students')->insert([
            'firstName' => 'Yee',
            'lastName' => 'Zhi Yew',
            'phoneNum' => '0125480228',
            'email' => 'cb21026@adab.umpsa.edu.my',
            'password' => bcrypt('test1234'),
            'ICNumber' => '010129083321',
            'dateOfBirth' => '2000-08-10',
            'nationality' => 'Malaysian Citizen',
            'gender' => 'Female',
        ]);

        DB::table('students')->insert([
            'firstName' => 'Lai',
            'lastName' => 'Jun Ta',
            'phoneNum' => '0172079809',
            'email' => 'cb21025@adab.umpsa.edu.my',
            'password' => bcrypt('test1234'),
            'ICNumber' => '011125020123',
            'dateOfBirth' => '2001-11-25',
            'nationality' => 'Malaysian Citizen',
            'gender' => 'Male',
        ]);

        DB::table('students')->insert([
            'firstName' => 'Sit',
            'lastName' => 'Wei Min',
            'phoneNum' => '01155036595',
            'email' => 'cb21015@adab.umpsa.edu.my',
            'password' => bcrypt('test1234'),
            'ICNumber' => '011228041130',
            'dateOfBirth' => '2001-12-28',
            'nationality' => 'Malaysian Citizen',
            'gender' => 'Male',
        ]);


        DB::table('students')->insert([
            'firstName' => 'Nurul',
            'lastName' => 'Syazana',
            'phoneNum' => '01161007875',
            'email' => 'cb21029@adab.umpsa.edu.my',
            'password' => bcrypt('test1234'),
            'ICNumber' => '021123060032',
            'dateOfBirth' => '2000-11-23',
            'nationality' => 'Malaysian Citizen',
            'gender' => 'Female',
        ]);

        DB::table('students')->insert([
            'firstName' => 'Pang',
            'lastName' => 'Yi He',
            'phoneNum' => '01112724482',
            'email' => 'cd21074@adab.umpsa.edu.my',
            'password' => bcrypt('test1234'),
            'ICNumber' => '010707041414',
            'dateOfBirth' => '2001-07-07',
            'nationality' => 'Malaysian Citizen',
            'gender' => 'Male',
        ]);

        DB::table('students')->insert([
            'firstName' => 'Tan',
            'lastName' => 'Jie Ying',
            'phoneNum' => '0165365369',
            'email' => 'cb21037@adab.umpsa.edu.my',
            'password' => bcrypt('test1234'),
            'ICNumber' => '010718084444',
            'dateOfBirth' => '2001-07-18',
            'nationality' => 'Malaysian Citizen',
            'gender' => 'Female',
        ]);

        DB::table('students')->insert([
            'firstName' => 'Kalvin',
            'lastName' => 'Chen',
            'phoneNum' => '0185787293',
            'email' => 'cb21052@adab.umpsa.edu.my',
            'password' => bcrypt('test1234'),
            'ICNumber' => '011030084433',
            'dateOfBirth' => '2001-10-30',
            'nationality' => 'Malaysian Citizen',
            'gender' => 'Male',
        ]);

        DB::table('students')->insert([
            'firstName' => 'Lee',
            'lastName' => 'Hui Ni',
            'phoneNum' => '01161569195',
            'email' => 'cb21054@adab.umpsa.edu.my',
            'password' => bcrypt('test1234'),
            'ICNumber' => '010418082122',
            'dateOfBirth' => '2001-04-18',
            'nationality' => 'Malaysian Citizen',
            'gender' => 'Female',
        ]);

        DB::table('students')->insert([
            'firstName' => 'Soon',
            'lastName' => 'Wei Ye',
            'phoneNum' => '0175002409',
            'email' => 'cd21068@adab.umpsa.edu.my',
            'password' => bcrypt('test1234'),
            'ICNumber' => '010602040321',
            'dateOfBirth' => '2001-06-02',
            'nationality' => 'Malaysian Citizen',
            'gender' => 'Male',
        ]);

        DB::table('students')->insert([
            'firstName' => 'Yau',
            'lastName' => 'De En',
            'phoneNum' => '0124750884',
            'email' => 'cd21033@adab.umpsa.edu.my',
            'password' => bcrypt('test1234'),
            'ICNumber' => '010914101234',
            'dateOfBirth' => '2001-09-14',
            'nationality' => 'Malaysian Citizen',
            'gender' => 'Female',
        ]);

        DB::table('students')->insert([
            'firstName' => 'Chee',
            'lastName' => 'Jia Ning',
            'phoneNum' => '0134999149',
            'email' => 'ca21026@adab.umpsa.edu.my',
            'password' => bcrypt('test1234'),
            'ICNumber' => '011205011141',
            'dateOfBirth' => '2001-12-05',
            'nationality' => 'Malaysian Citizen',
            'gender' => 'Female',
        ]);

        DB::table('students')->insert([
            'firstName' => 'Teoh',
            'lastName' => 'Woei Ming',
            'phoneNum' => '0109431351',
            'email' => 'ca21074@adab.umpsa.edu.my',
            'password' => bcrypt('test1234'),
            'ICNumber' => '010709020567',
            'dateOfBirth' => '2001-07-09',
            'nationality' => 'Malaysian Citizen',
            'gender' => 'Male',
        ]);

        DB::table('students')->insert([
            'firstName' => 'Jimmy',
            'lastName' => 'Tang Jing Ming',
            'phoneNum' => '0163723566',
            'email' => 'ca21031@adab.umpsa.edu.my',
            'password' => bcrypt('test1234'),
            'ICNumber' => '010826130991',
            'dateOfBirth' => '2001-08-26',
            'nationality' => 'Malaysian Citizen',
            'gender' => 'Male',
        ]);

        DB::table('students')->insert([
            'firstName' => 'Andrew',
            'lastName' => 'Chee Zhi Yuen',
            'phoneNum' => '0194583368',
            'email' => 'ca21056@adab.umpsa.edu.my',
            'password' => bcrypt('test1234'),
            'ICNumber' => '011019046547',
            'dateOfBirth' => '2001-10-19',
            'nationality' => 'Malaysian Citizen',
            'gender' => 'Male',
        ]);

        DB::table('students')->insert([
            'firstName' => 'Danial Wafi',
            'lastName' => 'Bin Ramli',
            'phoneNum' => '0194649973',
            'email' => 'cb21066@adab.umpsa.edu.my',
            'password' => bcrypt('test1234'),
            'ICNumber' => '020422060456',
            'dateOfBirth' => '2002-04-22',
            'nationality' => 'Malaysian Citizen',
            'gender' => 'Male',
        ]);

        DB::table('students')->insert([
            'firstName' => 'Muhammad Amir',
            'lastName' => 'Bin Mohamed Ali',
            'phoneNum' => '0192291001',
            'email' => 'cb21060@adab.umpsa.edu.my',
            'password' => bcrypt('test1234'),
            'ICNumber' => '010612060988',
            'dateOfBirth' => '2001-06-12',
            'nationality' => 'Malaysian Citizen',
            'gender' => 'Male',
        ]);

        DB::table('students')->insert([
            'firstName' => 'Muhamad Azim',
            'lastName' => 'Bin M.Bakri',
            'phoneNum' => '0198580756',
            'email' => 'cb21002@adab.umpsa.edu.my',
            'password' => bcrypt('test1234'),
            'ICNumber' => '020901040664',
            'dateOfBirth' => '2002-09-01',
            'nationality' => 'Malaysian Citizen',
            'gender' => 'Male',
        ]);

        DB::table('students')->insert([
            'firstName' => 'Aina Jaleena',
            'lastName' => 'Binti Jusop',
            'phoneNum' => '0147341469',
            'email' => 'cb21089@adab.umpsa.edu.my',
            'password' => bcrypt('test1234'),
            'ICNumber' => '010213091122',
            'dateOfBirth' => '2001-02-13',
            'nationality' => 'Malaysian Citizen',
            'gender' => 'Female',
        ]);

        DB::table('students')->insert([
            'firstName' => 'Ahmad Kholid',
            'lastName' => 'Bin Khuzaini',
            'phoneNum' => '0195698426',
            'email' => 'cb21077@adab.umpsa.edu.my',
            'password' => bcrypt('test1234'),
            'ICNumber' => '010720067788',
            'dateOfBirth' => '2001-07-20',
            'nationality' => 'Malaysian Citizen',
            'gender' => 'Male',
        ]);


        DB::table('students')->insert([
            'firstName' => 'Mohammad Aidin Aiman',
            'lastName' => 'Bin Ahmad Hazizi',
            'phoneNum' => '0198458137',
            'email' => 'cb21071@adab.umpsa.edu.my',
            'password' => bcrypt('test1234'),
            'ICNumber' => '010130051144',
            'dateOfBirth' => '2001-01-30',
            'nationality' => 'Malaysian Citizen',
            'gender' => 'Male',
        ]);

        DB::table('students')->insert([
            'firstName' => 'Axzly Juni',
            'lastName' => 'Juni',
            'phoneNum' => '01165585092',
            'email' => 'cb20029@adab.umpsa.edu.my',
            'password' => bcrypt('test1234'),
            'ICNumber' => '010224041133',
            'dateOfBirth' => '2000-02-24',
            'nationality' => 'Malaysian Citizen',
            'gender' => 'Female',
        ]);

        DB::table('students')->insert([
            'firstName' => 'Muhammad Safwan',
            'lastName' => 'Bin Roshidin',
            'phoneNum' => '0189711323',
            'email' => 'cb21091@adab.umpsa.edu.my',
            'password' => bcrypt('test1234'),
            'ICNumber' => '020424023313',
            'dateOfBirth' => '2002-04-24',
            'nationality' => 'Malaysian Citizen',
            'gender' => 'Male',
        ]);

        DB::table('students')->insert([
            'firstName' => 'Tan',
            'lastName' => 'Li Min',
            'phoneNum' => '01127374781',
            'email' => 'cd21072@adab.umpsa.edu.my',
            'password' => bcrypt('test1234'),
            'ICNumber' => '011111012113',
            'dateOfBirth' => '2001-11-11',
            'nationality' => 'Malaysian Citizen',
            'gender' => 'Female',
        ]);

        DB::table('students')->insert([
            'firstName' => 'Tan',
            'lastName' => 'Pei Yee',
            'phoneNum' => '01162489611',
            'email' => 'cd21073@adab.umpsa.edu.my',
            'password' => bcrypt('test1234'),
            'ICNumber' => '011028083213',
            'dateOfBirth' => '2001-10-28',
            'nationality' => 'Malaysian Citizen',
            'gender' => 'Female',
        ]);
        DB::table('students')->insert([
            'firstName' => 'Ooi',
            'lastName' => 'Ming Fang',
            'phoneNum' => '0164752177',
            'email' => 'cb21059@adab.umpsa.edu.my',
            'password' => bcrypt('test1234'),
            'ICNumber' => '010228077788',
            'dateOfBirth' => '2001-02-28',
            'nationality' => 'Malaysian Citizen',
            'gender' => 'Female',
        ]);
        DB::table('students')->insert([
            'firstName' => 'Nicholas Tan',
            'lastName' => 'Kae Jer',
            'phoneNum' => '0128890840',
            'email' => 'cd21062@adab.umpsa.edu.my',
            'password' => bcrypt('test1234'),
            'ICNumber' => '011224101144',
            'dateOfBirth' => '2001-12-24',
            'nationality' => 'Malaysian Citizen',
            'gender' => 'Male',
        ]);
        DB::table('students')->insert([
            'firstName' => 'Choi',
            'lastName' => 'Siow Hooi',
            'phoneNum' => '0115890979',
            'email' => 'cd21063@adab.umpsa.edu.my',
            'password' => bcrypt('test1234'),
            'ICNumber' => '010128056677',
            'dateOfBirth' => '2001-01-28',
            'nationality' => 'Malaysian Citizen',
            'gender' => 'Female',
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