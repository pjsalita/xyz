<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Laravel') }}</title>
    <link rel='stylesheet' href='{{ mix('css/app.css') }}'>
</head>
<body>
    <noscript>
        <p style="text-align: center">You need to enable JavaScript to run this app.</p>
    </noscript>

    <div id="app">
        <div class="spinner-container">
            <div class="spinner-border"></div>
        </div>
    </div>

    <script src="{{ mix('js/app.js') }}"></script>
</body>
</html>
