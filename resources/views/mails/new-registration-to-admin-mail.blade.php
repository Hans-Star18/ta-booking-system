<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Hotel Registration - Approval Required</title>
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

        .info-box {
            background-color: #f8f9fa;
            padding: 20px;
            margin: 20px 0;
            border-radius: 4px;
        }

        .field {
            margin-bottom: 15px;
        }

        .field-label {
            font-weight: bold;
            color: #555;
            display: block;
            margin-bottom: 5px;
        }

        .field-value {
            background-color: #fff;
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }

        .footer {
            background-color: #a1a3a4;
            color: #ffffff;
            padding: 25px 30px;
            text-align: center;
            font-size: 14px;
        }

        .timestamp {
            color: #666;
            font-size: 12px;
            text-align: right;
            margin-top: 20px;
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="header">
            <h1>{{ config('app.name', 'Link2Pay') }}</h1>
            <p style="margin: 5px 0 0 0;">New Hotel Registration - Approval Required</p>
        </div>

        <div class="content">
            <h2 style="color: #2c3e50; margin-top: 0;">Hello Admin,</h2>
            <p>A new hotel registration needs your approval before the customer can access their dashboard.</p>

            <p>Here are the details of the new hotel registration:</p>

            <div class="info-box">
                <h3 style="margin-top: 0; color: #2c3e50;">User Information</h3>

                <div class="field">
                    <span class="field-label">Name:</span>
                    <div class="field-value">{{ $user['name'] }}</div>
                </div>

                <div class="field">
                    <span class="field-label">Email:</span>
                    <div class="field-value">
                        <a href="mailto:{{ $user['email'] }}" style="color: #007bff;">{{ $user['email'] }}</a>
                    </div>
                </div>

                <div class="field">
                    <span class="field-label">Password:</span>
                    <div class="field-value">
                        <span>{{ $password }}</span>
                    </div>
                </div>
            </div>

            <div class="info-box">
                <h3 style="margin-top: 0; color: #2c3e50;">Hotel Information</h3>

                <div class="field">
                    <span class="field-label">Hotel Name:</span>
                    <div class="field-value">{{ $hotel['name'] }}</div>
                </div>

                <div class="field">
                    <span class="field-label">Address:</span>
                    <div class="field-value">{{ $hotel['address'] }}</div>
                </div>

                <div class="field">
                    <span class="field-label">Phone Number:</span>
                    <div class="field-value">
                        <a href="tel:{{ $hotel['phone'] }}" style="color: #007bff;">{{ $hotel['phone'] }}</a>
                    </div>
                </div>

                <div class="field">
                    <span class="field-label">Website:</span>
                    <div class="field-value">
                        <a href="{{ $hotel['website'] }}" target="_blank"
                            style="color: #007bff;">{{ $hotel['website'] }}</a>
                    </div>
                </div>
            </div>

            <div class="timestamp">
                Registration received on: {{ now()->format('d-m-Y H:i:s') }}
            </div>
        </div>

        <div class="footer">
            <p style="margin: 0;">
                &copy; {{ date('Y') }} {{ config('app.name', 'Link2Pay') }}. All rights reserved.
            </p>
        </div>
    </div>
</body>

</html>
