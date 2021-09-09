<?php


return [

    /*
    |--------------------------------------------------------------------------
    | Messenger Default User Model
    |--------------------------------------------------------------------------
    |
    | This option defines the default User model.
    |
    */

    'user' => [
        'model' => 'App\User'
    ],

    /*
    |--------------------------------------------------------------------------
    | Messenger Pusher Keys
    |--------------------------------------------------------------------------
    |
    | This option defines pusher keys.
    |
    */

    'pusher' => [
        'app_id'     => '1258961',
        'app_key'    => '4c81c662885079cc5c1e',
        'app_secret' => '0a094936ed05b7510b45',
        'options' => [
            'cluster'   => 'eu',
            'encrypted' => true
        ]
    ],
];
