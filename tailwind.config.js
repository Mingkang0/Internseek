import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [
        require('flowbite/plugin')({
            charts: true,
        }),
        forms, 
    ],

    safelist: [
        'text-2xl',
        'text-3xl',
        {
          pattern: /bg-(red|green|blue)-(100|200|300)/,
          variants: ['lg', 'hover', 'focus', 'lg:hover'],
        },
      ],
};
