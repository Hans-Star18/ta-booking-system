<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inquiry Mail</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333333;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .header {
            background-color: #a1a3a4;
            padding: 30px 20px;
            text-align: center;
        }

        .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }

        .content {
            padding: 20px 30px;
        }

        .success-icon {
            text-align: center;
            margin-bottom: 20px;
        }

        .footer {
            background-color: #a1a3a4;
            color: #ffffff;
            padding: 25px 30px;
            text-align: center;
            font-size: 14px;
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="header">
            <h1>{{ config('app.name', 'Link2Pay') }}</h1>
        </div>

        <div class="content">
            <p><strong>Inquiry Mail</strong></p>
            <ul style="list-style: none; padding: 0;">
                <li><strong>Name:</strong> {{ $inquiry['name'] }}</li>
                <li><strong>Email:</strong> {{ $inquiry['email'] }}</li>
                <li><strong>Message:</strong> {{ $inquiry['message'] }}</li>
            </ul>

        </div>

        <div class="footer">
            <p style="margin: 0;">
                © {{ date('Y') }} {{ config('app.name', 'Link2Pay') }}. All rights reserved.
            </p>
        </div>
    </div>
</body>

</html>
