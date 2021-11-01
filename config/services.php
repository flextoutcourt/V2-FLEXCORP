<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],
    'nexmo' => [
        'sms_from' => '',
    ],
    'google' => [
        'client_id' => '976787034548-0n11odedkg4nu0q7cf1g8g56j4d4ao08.apps.googleusercontent.com',
        'client_secret' => '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',
        'redirect' => 'http://localhost:3000/login/google/callback',
    ],
    'facebook' => [
        'client_id' => '675735063377855',
        'client_secret' => '978d41b25cd20c38d2b7a376da4a8ce8',
        'redirect' => 'http://localhost:3000/login/facebook/callback'
    ],
    'github' => [
        'client_id' => 'e72f2b8a7bb160d2045e',
        'client_secret' => '3e317c95cbcb3be7c284b3c091eaebc44762d869',
        'redirect' => 'http://localhost:3000/login/github/callback',
    ],

];
