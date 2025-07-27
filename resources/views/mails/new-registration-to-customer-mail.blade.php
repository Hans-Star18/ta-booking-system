<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hotel Registration Successful - Pending Approval</title>
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

        .credentials-box {
            background-color: #f8f9fa;
            border: 2px solid #007bff;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
            text-align: center;
        }

        .hotel-summary {
            background-color: #e8f5e8;
            padding: 20px;
            margin: 20px 0;
            border-radius: 4px;
        }

        .field {
            margin-bottom: 12px;
        }

        .field-label {
            font-weight: bold;
            color: #555;
            margin-bottom: 5px;
            display: block;
        }

        .field-value {
            color: #333;
        }

        .password-display {
            background-color: #2c3e50;
            color: white;
            padding: 15px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 18px;
            font-weight: bold;
            letter-spacing: 2px;
            margin: 10px 0;
            text-align: center;
        }

        .dashboard-button {
            display: inline-block;
            background-color: #007bff;
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            font-size: 16px;
            margin: 20px 0;
        }

        .warning-box {
            background-color: #fdf2e9;
            border: 1px solid #f39c12;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }

        .footer {
            background-color: #2c3e50;
            color: white;
            padding: 20px;
            text-align: center;
            font-size: 14px;
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="header">
            <h1>{{ config('app.name', 'Link2Pay') }}</h1>
            <p style="margin: 5px 0 0 0;">Welcome to Our Platform</p>
        </div>

        <div class="content">
            <h2 style="color: #2c3e50; text-align: center; margin-top: 0;">
                Welcome, {{ $user['name'] }}!
            </h2>

            <p style="text-align: center; font-size: 16px;">
                Your hotel registration has been successfully received. Here is your account and hotel information:
            </p>

            <div class="credentials-box">
                <h3 style="margin-top: 0; color: #2c3e50;">Your Login Information</h3>

                <div class="field">
                    <span class="field-label">Email:</span>
                    <div class="field-value" style="font-weight: bold; color: #007bff;">{{ $user['email'] }}</div>
                </div>

                <div class="field">
                    <span class="field-label">Temporary Password:</span>
                    <div class="password-display">{{ $password }}</div>
                </div>

                <p style="margin: 15px 0 0 0; font-size: 12px; color: #666;">
                    <strong>Important:</strong> Please save this password securely. You can change it after your
                    first login.
                </p>
            </div>

            <div class="hotel-summary">
                <h3 style="margin-top: 0; color: #28a745;">Your Hotel Summary</h3>

                <div class="field">
                    <span class="field-label">Hotel Name:</span>
                    <div class="field-value"><strong>{{ $hotel['name'] }}</strong></div>
                </div>

                <div class="field">
                    <span class="field-label">Address:</span>
                    <div class="field-value">{{ $hotel['address'] }}</div>
                </div>

                <div class="field">
                    <span class="field-label">Phone:</span>
                    <div class="field-value">{{ $hotel['phone'] }}</div>
                </div>

                <div class="field">
                    <span class="field-label">Website:</span>
                    <div class="field-value">
                        <a href="{{ $hotel['website'] }}" style="color: #28a745;">{{ $hotel['website'] }}</a>
                    </div>
                </div>

                <div class="field">
                    <span class="field-label">Hotel Email:</span>
                    <div class="field-value">{{ $hotel['email'] }}</div>
                </div>
            </div>

            <div style="text-align: center;">
                <a href="{{ route('organizer.dashboard') }}" class="dashboard-button">
                    Access Hotel Dashboard
                </a>
            </div>

            <div class="warning-box">
                <strong>Next Steps:</strong><br>
                1. <strong>Wait for Approval:</strong> Our team will verify your hotel information within 1-2 business
                days<br>
                2. <strong>Check Email:</strong> You will receive an email notification when your account is
                approved<br>
                3. <strong>First Login:</strong> Use the email and password above to login<br>
                4. <strong>Complete Profile:</strong> After login, complete your hotel information and profile<br>
                5. <strong>Change Password:</strong> We recommend changing your password after first login
            </div>

            <p style="margin-top: 30px; text-align: center;">
                <strong>Need Help?</strong><br>
                If you have any questions, please contact our support team:<br>
                Email: <a href="mailto:{{ config('app.contact.email') }}"
                    style="color: #007bff;">{{ config('app.contact.email') }}</a><br>
                Phone/Whatsapp: <a href="https://wa.me/{{ config('app.contact.phone') }}"
                    style="color: #007bff;">{{ config('app.contact.phone') }}</a><br>
            </p>
        </div>

        <div class="footer">
            <p style="margin: 0;">
                &copy; {{ date('Y') }} {{ config('app.name', 'Link2Pay') }}. All rights reserved.
            </p>
        </div>
    </div>
</body>

</html>
