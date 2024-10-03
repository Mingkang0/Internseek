<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Employer;
use App\Models\Company;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CompanyFactory>
 */
class CompanyFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected $model = Company::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $registrationStatus = $this->faker->randomElement(['Pending','Inquiry', 'Approved', 'Approved', 'Approved', 'Approved', 'Approved', 'Approved']);

        $state= $this->faker->randomElement(['Johor', 'Kedah', 'Kelantan', 'Kuala Lumpur', 'Labuan', 'Melaka', 'Negeri Sembilan', 'Pahang', 'Perak', 'Perlis', 'Pulau Pinang', 'Putrajaya', 'Sabah', 'Sarawak', 'Selangor', 'Terengganu']);
        return [
            'companyName' => $this->faker->company,
            'companyEmail' => $this->faker->unique()->safeEmail,
            'businessRegNum' => $this->faker->randomElement(['123456', '234567', '345678', '456789'. '567890', '678901', '789012', '890123']),
            'businessRegDate' => $this->faker->dateTimeBetween('-15 years', 'now')->format('Y-m-d'),
            'companyType' => $this->faker->randomElement(['SME', 'MNC', 'International', 'Government Agency', 'NGO', 'Government Company']),
            'documentType' => $this->getDocumentType($this->faker->randomElement(['SME', 'MNC', 'International', 'Government Agency', 'NGO', 'Government Company'])),
            'documentName' => $this->faker->word,
            'companyPhone' => $this->faker->phoneNumber,
            'companyAddress1' => $this->faker->address,
            'companyAddress2' => $this->faker->address,
            'companyPostalCode' => $this->faker->postcode,
            'companyCity' => $this->getCity($state),
            'companyState' => $state,  
            'companyCountry' => 'Malaysia',
            'companySector' => $this->faker->randomElement(['Software', 'Hardware', 'Networking', 'Cybersecurity', 'Data Science', 'Artificial Intelligence','IT','E-Commerce', 'Finance', 'Healthcare', 'Education', 'Manufacturing', 'Retail', 'Transportation', 'Logistics', 'Hospitality', 'Tourism', 'Real Estate', 'Construction', 'Engineering', 'Agriculture', 'Food & Beverage', 'Media', 'Entertainment', 'Sports', 'Fashion', 'Beauty', 'Automotive', 'Oil & Gas', 'Utilities', 'Telecommunications']),
            'companySize' => $this->faker->randomElement(['1-10', '11-50', '51-200', '201-500', '501-1000', '1001-5000', '5001-10000', '10001+']),
            'companyWebsite' => $this->faker->url,
            'inquiryComment' => $registrationStatus === 'Inquiry' ? $this->getInquiryComment($registrationStatus) : null,
            'companyDescription' => $this->faker->sentence,
            'vision' => $this->faker->sentence,
            'mission' => $this->faker->sentence,
            'companyRating' => $this->faker->randomElement(['Highly Recommended', 'Recommended', 'Average', 'Shut Down']),
            'registrationStatus' => $registrationStatus,
            'companyLogo' => $this->faker->imageUrl(),
        ];
    }

    function getDocumentType($companyType) {
        switch ($companyType) {
            case 'SME':
                return 'SSM Certificate';
            case 'International':
                return 'Certificate of Incorporation';
            case 'MNC':
                return 'ROS Certificate';
            case 'NGO':
                return 'ROS Certificate';
            case 'Government Agency':
                return 'Establishment Act Certificate';
            case 'Government Company':
                return ' MOF Registration Certificate';
            default:
                return '';
        }
    }

    function getCity($state) {
        switch ($state) {
            case 'Johor':
                return $this->faker->randomElement(['Johor Bahru', 'Batu Pahat', 'Kluang', 'Muar', 'Segamat']);
            case 'Kedah':
                return $this->faker->randomElement(['Alor Setar']);
            case 'Kelantan':
                return $this->faker->randomElement(['Kota Bharu']);
            case 'Kuala Lumpur':
                return $this->faker->randomElement(['Kuala Lumpur', 'Kepong', 'Setapak', 'Wangsa Maju', 'Cheras', 'Bukit Bintang', 'Bukit Jalil', 'Bukit Nanas', 'Bukit Tunku', 'Chow Kit', 'Damansara Heights', 'Desa ParkCity', 'Desa Petaling', 'Kampung Baru', 'Keramat', 'Maluri', 'Mont Kiara', 'Pantai Dalam', 'Pudu', 'Salak South', 'Serdang', 'Setiawangsa', 'Sri Petaling', 'Taman Connaught', 'Taman Desa', 'Taman Len Seng', 'Taman Melawati', 'Taman Tun Dr Ismail', 'Titiwangsa', 'Wangsa Maju']);
            case 'Labuan':
                return $this->faker->randomElement(['Labuan']);
            case 'Melaka':
                return $this->faker->randomElement(['Melaka City']);
            case 'Negeri Sembilan':
                return $this->faker->randomElement(['Seremban']);
            case 'Pahang':
                return $this->faker->randomElement(['Kuantan', 'Temerloh', 'Bentong', 'Raub', 'Pekan', 'Jerantut']);
            case 'Perak':
                return $this->faker->randomElement(['Ipoh', 'Taiping', 'Sitiawan']);
            case 'Perlis':
                return $this->faker->randomElement(['Kangar', 'Arau']);
            case 'Pulau Pinang':
                return $this->faker->randomElement(['George Town', 'Bukit Mertajam', 'Butterworth']);
            case 'Putrajaya':
                return $this->faker->randomElement(['Putrajaya']);
            case 'Sabah':
                return $this->faker->randomElement(['Kota Kinabalu']);
            case 'Sarawak':
                return $this->faker->randomElement(['Kuching', 'Sibu', 'Miri', 'Bintulu']);
            case 'Selangor':
                return $this->faker->randomElement(['Shah Alam', 'Petaling Jaya', 'Subang Jaya', 'Klang', 'Ampang', 'Cheras', 'Cyberjaya', 
                'Damansara', 'Kajang', 'Kelana Jaya', 'Kuala Selangor', 
                'Rawang', 'Semenyih', 'Sepang', 'Sungai Buloh']);
            case 'Terengganu':
                return $this->faker->randomElement(['Kuala Terengganu', 'Dungun', 'Marang', 'Kemaman', 'Besut', 'Setiu', 'Hulu Terengganu']);
            default:
                return '';
        }
    }

    function getInquiryComment($registrationStatus) {
        switch ($registrationStatus) {
            case 'Inquiry':
                return 'Required change company details';
            default:
                return '';
        }
    }
}
