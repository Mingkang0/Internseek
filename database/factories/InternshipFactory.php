<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Internship;
use Faker\Generator as Faker;
use App\Models\Employer;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class InternshipFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected $model = Internship::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'internshipTitle' => $this->faker->jobTitle,
            'internshipDescription' => $this->faker->paragraph,
            'internshipRequirement' => $this->faker->paragraph,
            'internshipResponsibility' => $this->faker->paragraph,
            'internshipDuration' => $this->faker->numberBetween(1, 12),
            'internshipAllowance' => $this->faker->numberBetween(1000, 5000),
            'startPostingDate' => $this->faker->date,
            'endPostingDate' => $this->faker->date,
            'workingHour' => $this->faker->numberBetween(1, 8),
            'postingStatus' => $this->faker->randomElement(['Archived','Expired', 'Published', 'Unpublished']),
            'workingMethod' => $this->faker->randomElement(['Remote', 'Onsite', 'OnOffice', 'Hybrid']),
            'studyScope' => $this->faker->randomElement(['Software Engineering', 'Computer System & Networking', 'Cybersecurity', 'Graphic Design & Multimedia', 'Artificial Intelligence', 'Data Engineering']),
            'employerID' => \App\Models\Employer::factory()->create()->id, // assuming an Employer factory exists
        ];
    }
}
