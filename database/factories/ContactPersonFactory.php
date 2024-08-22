<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\ContactPerson;
use App\Models\Employer;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ContactPerson>
 */
class ContactPersonFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected $model = ContactPerson::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'firstName' => $this->faker->firstName,
            'lastName' => $this->faker->lastName,
            'phoneNum' => $this->faker->phoneNumber,
            'email' => $this->faker->unique()->safeEmail,
            'password' => bcrypt('1234'),
            'employerID' => \App\Models\Employer::factory()->create()->id, // assuming an Employer factory exists
            'department' => $this->faker->randomElement(['Human Resource', 'Information Technology', 'Marketing', 'Finance', 'Operation', 'Research & Development']),
            'position' => $this->faker->randomElement(['Manager', 'HR Recruiter', 'Director', 'CEO']),
        ];
    }
}
