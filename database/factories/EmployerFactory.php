<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Generator as Faker;
use App\Models\Employer;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class EmployerFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected $model = Employer::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            'companyName' => $this->faker->name,
            'companyEmail' => $this->faker->unique()->safeEmail,
            'companyPhone' => $this->faker->phoneNumber,
            'companyAddress1' => $this->faker->address,
            'companyAddress2' => $this->faker->address,
            'companyPostalCode' => $this->faker->postcode,
            'companyCity' => $this->faker->city,
            'companyState' => $this->faker->state,
            'companyCountry' => $this->faker->country,
            'companySector' => $this->faker->randomElement(['Software', 'Hardware', 'Networking', 'Cybersecurity', 'Data Science', 'Artificial Intelligence']),
            'companySize' => $this->faker->randomElement(['Small', 'Medium', 'Large']),
            'companyWebsite' => $this->faker->url,
            'vision' => $this->faker->sentence,
            'mission' => $this->faker->sentence,
            'companyDescription' => $this->faker->sentence,
            'companyRating' => $this->faker->randomElement(['Highly Recommended', 'Recommended', 'Average', 'Shut Down']),
            'registrationStatus' => $this->faker->randomElement(['Pending', 'Inquiry', 'Approved']),
            'companyLogo' => $this->faker->imageUrl(),
            'companyType' => $this->faker->randomElement(['SME', 'MNC', 'International', 'Government Agency', 'NGO', 'Government Company']),
            'businessRegNum' => $this->faker->randomElement(['123456', '234567', '345678', '456789']),
            'businessRegDate' => $this->faker->date,
            'documentType' => $this->faker->randomElement(['Certificate of Incorporation', 'Form 9', 'Form 24', 'Form 49']),
            'documentName' => $this->faker->name,
            'inquiryComment' => $this->faker->sentence,
        ];
    }
}
