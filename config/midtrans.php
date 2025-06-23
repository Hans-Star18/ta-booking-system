<?php

return [
    'serverKey'    => env('MIDTRANS_SERVER_KEY'),
    'clientKey'    => env('MIDTRANS_CLIENT_KEY'),
    'isProduction' => env('MIDTRANS_IS_PRODUCTION', false),
    'isSanitize'   => env('MIDTRANS_IS_SANITIZE', false),
    'is3ds'        => env('MIDTRANS_IS_3DS', false),
];
