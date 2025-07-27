<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hotel Approved - Welcome to Our Platform!</title>
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

        .approval-box {
            background-color: #d4edda;
            border: 1px solid #c3e6cb;
            padding: 20px;
            margin: 20px 0;
            border-radius: 4px;
            text-align: center;
        }

        .credentials-reminder {
            background-color: #f8f9fa;
            border: 2px solid #007bff;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
        }

        .hotel-info {
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

        .dashboard-button {
            display: inline-block;
            background-color: #28a745;
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            font-size: 16px;
            margin: 20px 0;
            text-align: center;
        }

        .features-box {
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
            padding: 20px;
            margin: 20px 0;
            border-radius: 4px;
        }

        .feature-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .feature-list li {
            padding: 8px 0;
            border-bottom: 1px solid #e9ecef;
        }

        .feature-list li:last-child {
            border-bottom: none;
        }

        .feature-list li:before {
            content: "✅";
            margin-right: 10px;
        }

        .footer {
            background-color: #2c3e50;
            color: white;
            padding: 20px;
            text-align: center;
            font-size: 14px;
        }

        .footer a {
            color: #3498db;
            text-decoration: none;
        }

        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
            }

            .content {
                padding: 20px !important;
            }

            .header {
                padding: 20px 15px !important;
            }
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="header">
            <h1>{{ config('app.name', 'Link2Pay') }}</h1>
            <p style="margin: 5px 0 0 0;">Congratulations! Your Hotel is Now Active</p>
        </div>

        <div class="content">
            <h2 style="color: #28a745; text-align: center; margin-top: 0;">
                Great News, {{ $user['name'] }}!
            </h2>

            <div class="approval-box">
                <h3 style="margin-top: 0; color: #155724;">Your Hotel Has Been Approved!</h3>
                <p style="margin-bottom: 0; font-size: 16px;">
                    Your hotel registration has been successfully verified and approved by our admin team.
                    You can now access all features of our platform!
                </p>
            </div>

            <div class="credentials-reminder">
                <h3 style="margin-top: 0; color: #2c3e50;">Your Login Credentials</h3>
                <p>Use these credentials to access your hotel dashboard:</p>

                <div class="field">
                    <span class="field-label">Email:</span>
                    <div class="field-value" style="font-weight: bold; color: #007bff;">{{ $user['email'] }}</div>
                </div>

                <div class="field">
                    <span class="field-label">Password:</span>
                    <div class="field-value">Use the temporary password sent in your registration email</div>
                </div>

                <p style="margin: 15px 0 0 0; font-size: 12px; color: #666;">
                    <strong>Tip:</strong> We recommend changing your password after logging in for security purposes.
                </p>
            </div>

            <div class="hotel-info">
                <h3 style="margin-top: 0; color: #28a745;">Your Approved Hotel Details</h3>

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
            </div>

            <div style="text-align: center;">
                <a href="{{ route('organizer.dashboard') }}" class="dashboard-button">
                    Access Hotel Dashboard
                </a>
            </div>

            <div class="features-box">
                <h3 style="margin-top: 0; color: #2c3e50;">What You Can Do Now</h3>
                <ul class="feature-list">
                    <li><strong>Manage Bookings:</strong> View and manage all hotel reservations</li>
                    <li><strong>Update Hotel Info:</strong> Edit your hotel details and amenities</li>
                    <li><strong>Room Management:</strong> Add, edit, and manage your room inventory</li>
                    <li><strong>Pricing Control:</strong> Set and update room rates</li>
                    <li><strong>Profile Settings:</strong> Customize your account</li>
                </ul>
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
