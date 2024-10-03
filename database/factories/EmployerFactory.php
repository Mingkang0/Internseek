<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Generator as Faker;
use App\Models\Company;
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
            'firstName' => $this->faker->firstName,
            'lastName' => $this->faker->lastName,
            'phoneNum' => $this->faker->phoneNumber,
            'email' => $this->faker->unique()->safeEmail,
            'password' => bcrypt('12345678'),
            'userType' => $userType = $this->faker->randomElement(['admin', 'user']),
            'status' => $userType === 'admin' ? 'Active' : $this->faker->randomElement(['Active', 'Inactive', 'Active', 'Active', 'Active']),
            'position' => $this->faker->randomElement(['HR', 'IT', 'Finance', 'Marketing', 'Sales', 'Operation', 'Admin', 'Management', 'Engineering', 'Consulting', 'Legal', 'Compliance', 'Risk Management', 'Health & Safety', 'Environment', 'Training & Development', 'Production', 'Maintenance', 'Technical', 'Teaching', 'Training', 'Coaching', 'Counselling', 'Therapist']),
            'department' => $this->faker->randomElement(['HR', 'IT', 'Finance', 'Marketing', 'Sales', 'Operation', 'Admin', 'Management', 'Engineering', 'Consulting', 'Legal', 'Compliance', 'Risk Management', 'Health & Safety', 'Environment', 'Training & Development', 'Production', 'Maintenance', 'Technical', 'Teaching', 'Training', 'Coaching', 'Counselling', 'Therapist']),
            'companyID' => Company::factory(),
            'remember_token' => null,
            'reset_password_token' => null,
        ];
    }
}
