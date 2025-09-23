<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reservation Confirmation</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            line-height: 1.6;
        }
        .email-container {
            max-width: 800px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 0;
        }
        .header {
            background-color: #2c3e50;
            color: white;
            padding: 20px;
            text-align: center;
        }
        .content {
            padding: 30px;
        }
        .info-section {
            margin-bottom: 30px;
        }
        .section-title {
            font-size: 18px;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 15px;
            border-bottom: 2px solid #3498db;
            padding-bottom: 5px;
        }
        .info-row {
            display: flex;
            margin-bottom: 8px;
            align-items: flex-start;
        }
        .info-label {
            width: 150px;
            color: #7f8c8d;
            font-weight: 500;
            flex-shrink: 0;
        }
        .info-colon {
            margin: 0 10px;
            color: #7f8c8d;
        }
        .info-value {
            color: #2c3e50;
            flex: 1;
        }
        .status-success {
            background-color: #27ae60;
            color: white;
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
        }
        .status-pending {
            background-color: #f39c12;
            color: white;
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
        }
        .status-expired {
            background-color: #e74c3c;
            color: white;
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
        }
        .two-column {
            display: flex;
            gap: 40px;
            margin-bottom: 30px;
        }
        .column {
            flex: 1;
        }
        .room-details {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 5px;
        }
        .room-header {
            display: flex;
            justify-content-space-between;
            align-items: center;
            margin-bottom: 15px;
        }
        .room-title {
            font-weight: bold;
            color: #2c3e50;
            font-size: 16px;
        }
        .room-icon {
            color: #3498db;
        }
        .pricing-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        .pricing-table td {
            padding: 10px 0;
            border-bottom: 1px solid #ecf0f1;
        }
        .pricing-label {
            color: #7f8c8d;
            font-weight: 500;
        }
        .pricing-value {
            text-align: right;
            color: #2c3e50;
            font-weight: 500;
        }
        .total-row {
            font-weight: bold;
            font-size: 16px;
            border-top: 2px solid #3498db;
            border-bottom: none;
        }
        .total-row td {
            padding: 15px 0 10px 0;
            color: #2c3e50;
        }
        .comment-section {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .comment-title {
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 10px;
        }
        .comment-text {
            color: #7f8c8d;
            font-style: italic;
            line-height: 1.5;
        }
        .footer {
            background-color: #34495e;
            color: white;
            padding: 20px;
            text-align: center;
            font-size: 14px;
        }

        @media only screen and (max-width: 600px) {
            .two-column {
                flex-direction: column;
                gap: 20px;
            }
            .info-row {
                flex-direction: column;
            }
            .info-label {
                width: auto;
                margin-bottom: 5px;
            }
            .info-colon {
                display: none;
            }
            .content {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1 style="margin: 0; font-size: 24px;">Reservation Confirmation</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Thank you for your booking!</p>
        </div>

        <div class="content">
            <div class="two-column">
                <div class="column">
                    <div class="info-section">
                        <div class="section-title">Customer Information</div>
                        <div class="info-row">
                            <span class="info-label">Customer Name</span>
                            <span class="info-colon">:</span>
                            <span class="info-value">{{ $reservation->reservationCustomer->fullName }}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Email</span>
                            <span class="info-colon">:</span>
                            <span class="info-value">{{ $reservation->reservationCustomer->email }}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Telephone</span>
                            <span class="info-colon">:</span>
                            <span class="info-value">{{ $reservation->reservationCustomer->phone }}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Address</span>
                            <span class="info-colon">:</span>
                            <span class="info-value">{{ $reservation->reservationCustomer->address }}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">City</span>
                            <span class="info-colon">:</span>
                            <span class="info-value">{{ $reservation->reservationCustomer->city }}</span>
                        </div>
                    </div>
                </div>

                <div class="column">
                    <div class="info-section">
                        <div class="section-title">Reservation Information</div>
                        <div class="info-row">
                            <span class="info-label">Reservation Number</span>
                            <span class="info-colon">:</span>
                            <span class="info-value">{{ $reservation->reservation_number }}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Reservation Status</span>
                            <span class="info-colon">:</span>
                            <span class="info-value">
                                <span class="{{ $reservation->status == 'confirmed' ? 'status-success' : ($reservation->status == 'pending' ? 'status-pending' : 'status-expired') }}">
                                    {{ $reservation->status }}
                                </span>
                            </span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Transaction Status</span>
                            <span class="info-colon">:</span>
                            <span class="info-value">
                                <span class="{{ $reservation->transaction->payment_status == 'settlement' || $reservation->transaction->payment_status == 'success' || $reservation->transaction->payment_status == 'capture'
                                    ? 'status-success' : ($reservation->transaction->payment_status == 'pending' ? 'status-pending' : 'status-expired') }}">
                                    {{ $reservation->transaction->payment_status }}
                                </span>
                            </span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Deposit Amount</span>
                            <span class="info-colon">:</span>
                            <span class="info-value">
                                {{
                                    \Illuminate\Support\Number::currency($reservation->transaction->pay_now, in: 'IDR', locale: 'id', precision: 0)
                                }}
                            </span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Reservation Date</span>
                            <span class="info-colon">:</span>
                            <span class="info-value">
                                {{ $reservation->created_at->format('d/m/Y') }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div style="width: 100%; padding: 0px 10px; display: flex; justify-content: center;">
                <a href="{{ route('customer.transaction.check', ['reservation_number' => $reservation->reservation_number]) }}" style="color: white; text-decoration: none; padding: 10px; background-color: #007bff; border-radius: 5px;">
                    View Detail Reservation
                </a>
            </div>

            <table class="pricing-table">
                <tr>
                    <td class="pricing-label">Subtotal</td>
                    <td class="pricing-value">
                        {{
                            \Illuminate\Support\Number::currency($reservation->transaction->subtotal, in: 'IDR', locale: 'id', precision: 0)
                        }}
                    </td>
                </tr>
                <tr>
                    <td class="pricing-label">Tax ({{ $reservation->hotel->setting->tax_percentage ?? 0 }}%)</td>
                    <td class="pricing-value">
                        {{
                            \Illuminate\Support\Number::currency($reservation->transaction->tax_amount ?? 0, in: 'IDR', locale: 'id', precision: 0)
                        }}
                    </td>
                </tr>
                <tr>
                    <td class="pricing-label">Discount ({{ $reservation?->transaction?->promotion
                        ? $reservation->transaction->promotion->code . ' (' . $reservation->transaction->promotion->discount . '%)'
                        : $reservation->transaction->promotion_code }})</td>
                    <td class="pricing-value">
                        {{
                            \Illuminate\Support\Number::currency($reservation->transaction->discount ?? 0, in: 'IDR', locale: 'id', precision: 0)
                        }}
                    </td>
                </tr>
                <tr class="total-row">
                    <td>Total</td>
                    <td>
                        {{
                            \Illuminate\Support\Number::currency($reservation->transaction->total_price ?? 0, in: 'IDR', locale: 'id', precision: 0)
                        }}
                    </td>
                </tr>
                <tr>
                    <td class="pricing-label">Deposit Amount ({{ $reservation->hotel->setting->dp_percentage ?? '-' }}%)</td>
                    <td class="pricing-value">
                        {{
                            \Illuminate\Support\Number::currency($reservation->transaction->pay_now ?? 0, in: 'IDR', locale: 'id', precision: 0)
                        }}
                    </td>
                </tr>
                <tr>
                    <td class="pricing-label">Remaining Payment</td>
                    <td class="pricing-value">
                        {{
                            \Illuminate\Support\Number::currency($reservation->transaction->balance_to_be_paid ?? 0, in: 'IDR', locale: 'id', precision: 0)
                        }}
                    </td>
                </tr>
            </table>
        </div>

        <div class="footer">
            <p style="margin: 0;">
                &copy; {{ date('Y') }} {{ config('app.name', 'Link2Pay') }}. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>
