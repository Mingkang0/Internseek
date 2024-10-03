<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Internship;
use Faker\Generator as Faker;
use App\Models\Company;
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
        $activeApprovedEmployersCompanies = Company::whereHas('employers', function ($query) {
            $query->where('status', 'Active'); // Only active employers
        })
        ->where('registrationStatus', 'Approved') // Only companies with 'Approved' status
        ->with(['employers' => function ($query) {
            $query->where('status', 'Active'); // Only active employers
        }])
        ->get();
        
        $companyId = $activeApprovedEmployersCompanies->random()->id;
        $studyScope = $this->faker->randomElement(['Software Engineering', 'Computer System & Networking', 'Cybersecurity', 'Graphic Design & Multimedia', 'Artificial Intelligence', 'Data Engineering']);
        return [
            'internshipTitle' => $this->getInternshipTitle($studyScope),
            'internshipDescription' => $this->faker->sentence,
            'internshipRequirement' => $this->faker->sentence,
            'internshipResponsibility' => $this->faker->sentence,
            'internshipDuration' => $this->faker->randomElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
            'internshipAllowance' => $this->faker->randomElement([500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500]),
            'startPostingDate' => $this->faker->dateTimeBetween('-1 years', 'now')->format('Y-m-d'),
            'endPostingDate' => $this->faker->dateTimeBetween('now', '+1 years')->format('Y-m-d'),
            'workingHour' => $this->faker->randomElement([4, 5, 6, 7, 8, 9, 10]),
            'postingStatus' => $this->faker->randomElement([ 'Published']),
            'workingMethod' => $this->faker->randomElement(['Remote', 'Onsite', 'OnOffice', 'Hybrid']),
            'studyScope' => $studyScope,
            'companyID' => $companyId,
            'createdBy' => Company::find($companyId)->employers->random()->id,
            'lastEditedBy' => Company::find($companyId)->employers->random()->id,
            'branchID' => null,
            'siteID' => null,
        ];
    }

    function getInternshipTitle($studyScope) {
        switch ($studyScope) {
            case 'Software Engineering':
                return 'Software Engineer Intern';
            case 'Computer System & Networking':
                return 'Network Engineer Intern';
            case 'Cybersecurity':
                return 'Cybersecurity Intern';
            case 'Graphic Design & Multimedia':
                return 'Graphic Designer Intern';
            case 'Artificial Intelligence':
                return 'Artificial Intelligence Intern';
            case 'Data Engineering':
                return 'Data Engineer Intern';
            default:
                return 'Software Engineer Intern';
        }
    }
}
