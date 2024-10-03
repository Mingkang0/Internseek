<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Laravel CORS Options
    |--------------------------------------------------------------------------
    |
    | Here you can adjust the settings for Cross-Origin Resource Sharing (CORS)
    | such as allowed origins, headers, and methods.
    |
    */

    'paths' => [ 'web/*' ,'auth/linkedin', 'linkedin/callback', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],
    'allowed_origins' => ['*'], // This allows all origins, useful for local development
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,

];
