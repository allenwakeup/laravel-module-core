<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Log Channel
    |--------------------------------------------------------------------------
    |
    | This option defines the default log channel that gets used when writing
    | messages to the logs. The name specified in this option should match
    | one of the channels defined in the "channels" configuration array.
    |
    */

    'default' => env('MODULE_CORE_MAPPING_CHANNEL', 'user_permissions'),

    /*
    |--------------------------------------------------------------------------
    | Data Route Mappings Channels
    |--------------------------------------------------------------------------
    |
    | Here you may configure the data route mappings channels for your application. Out of
    | the box, Module Core Mapping can do everything for mapping check. This gives
    | you a variety of powerful mapping handlers to utilize.
    |
    | Available Mapping: "user_permissions",
    |
    */

    'channels' => [
        'user_permissions' => [
            'from' => 'users',
            'to' => 'permissions',
        ]
    ]

];
