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
        'client_id' => env('FLEX_GOOGLE_CLIENT_ID'),
        'client_secret' => env('FLEX_GOOGLE_CLIENT_SECRET'),
        'redirect' => env('APP_URL').'/'.env('FLEX_GOOGLE_REDIRECT_URI'),
    ],
    'facebook' => [
        'client_id' => env('FLEX_FACEBOOK_CLIENT_ID'),
        'client_secret' => env('FLEX_FACEBOOK_CLIENT_SECRET'),
        'redirect' => env('APP_URL').'/'.env('FLEX_FACEBOOK_REDIRECT_URI')
    ],
    'github' => [
        'client_id' => env('FLEX_GITHUB_CLIENT_ID'),
        'client_secret' => env('FLEX_GITHUB_CLIENT_SECRET'),
        'redirect' => env('APP_URL').'/'.env('FLEX_GITHUB_REDIRECT_URI'),
    ],
    'pusher' => [
        'beams_instance_id' => env('FLEX_PUSHER_INSTANCE_ID'),
        'beams_secret_key' => env('FLEX_PUSHER_SECRET_KEY'),
    ],
    

];
