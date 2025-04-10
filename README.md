# Internship-Application-System (Internseek)

![Internseek Logo](public/assets/logo.png)

[**Internseek**](https://internseek.raegrp.com/) is a web-based Internship Application System developed as part of my Final Year Project for a bachelor's degree at the [University of Malaysia Pahang Al-Sultan Abdullah](https://www.umpsa.edu.my/en). The platform is designed specifically for undergraduate students majoring in computer science to simplify the process of finding and applying for internships.

Internseek offers features like auto-generated resumes and built-in messaging, providing a streamlined and user-friendly experience for students searching for internship opportunities.

## Table of Contents

- [Features](#features)
- [Usage](#usage)
- [Technologies](#technologies)
- [Installation](#installation)

## Features

Internseek provides several key features that enhance the internship application process for computer science students:

- **User Registration and Login**: Secure and easy registration and login for students and employers, ensuring a personalized experience.
- **Login with LinkedIn Account**: Users can log in using their LinkedIn account  for easier access.
- **Internship Listings**: Access a wide range of internship opportunities specifically tailored for computer science majors.
- **Company Listings**: A dedicated section for viewing registered companies to give students insights into potential employers.
- **Company Registration**: Employers can easily register their companies, enabling them to post internships and manage applications.
- **Internship Applications**: Simplified application process for students to apply for internships directly through the platform.
- **Auto-Generated Resume**: Automatically generate a professional resume based on the user's profile and input data.
- **Messaging System**: Built-in messaging feature for direct communication between students and potential employers.
- **Profile Management**: Students can create and manage their profiles, including portfolios, work experience, and skills.
- **Application Tracking**: Track the status of internship applications for easy follow-ups.
- **Responsive Design**: Fully responsive interface optimized for desktop and mobile devices.

## Technologies

[![Laravel](https://img.shields.io/badge/laravel-%23FF2D20.svg?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![Inertia.js](https://img.shields.io/badge/inertia.js-%238700b3.svg?style=for-the-badge&logo=inertia&logoColor=white)](https://inertiajs.com/)
[![PostgreSQL](https://img.shields.io/badge/postgresql-%23336791.svg?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Flowbite](https://img.shields.io/badge/flowbite-%2303A9F4.svg?style=for-the-badge&logo=flowbite&logoColor=white)](https://flowbite.com/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## Usage

You can access the Internseek website at the following link:

[Internseek](https://internseek.raegrp.com/)

Once on the site, you can:

1. **Register as a Student or Employer**: Use the registration form to create an account.
2. **Browse Internships**: Navigate through the internship listings to find suitable opportunities.
3. **Apply for Internships**: Click on any internship listing to view details and submit your application.
4. **Manage Your Profile**: Access your profile and manage experiences, education, skills, accomplishments, and referees.
5. **Track Internship Applications**: Monitor the status of your internship applications for easy follow-ups.

## Installation

To set up the project locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Mingkang0/Internseek.git
   cd internseek
2. **Install Composer Dependencies**:
   ```bash
   composer install
3. **Install Node.js Dependencies**:
   ```bash
   npm install
4. **Set Up the Environment**:
   ```bash
   cp .env.example .env
5. **Generate Application Key**:
   ```bash
   php artisan key:generate
6. **Run Database Migrations & Seed the Database**:
   ```bash
   php artisan migrate:fresh --seed
7. **Build Assets**:
   ```bash
   npm run dev
8. **Start the Development Server**:
   ```bash
   php artisan serve
9. Access the Application: Open your browser and navigate to http://127.0.0.1:8000.

