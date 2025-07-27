<?php

namespace Database\Seeders\stub;

use App\Models\Hotel;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class HotelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $hotels = [
            [
                'user_id'            => 2,
                'uuid'               => Str::uuid(),
                'name'               => 'Hotel California',
                'address'            => 'Jl. Sunset Road No. 88, Kuta, Bali',
                'phone'              => '0361-123456',
                'mobile'             => '081234567890',
                'email'              => 'info@california.com',
                'website'            => 'www.california.com',
                'term_and_condition' => $this->getTermAndConditions(),
                'is_active'          => true,
                'approved_at'        => now(),
            ],
        ];

        foreach ($hotels as $hotel) {
            $hotel = Hotel::create($hotel);
        }
    }

    protected function getTermAndConditions()
    {
        return '<section>
            <h2>Terms and Conditions</h2>

            <h3>1. Check-in & Check-out</h3>
            <ul>
                <li>Check-in time: 14:00</li>
                <li>Check-out time: 12:00</li>
                <li>Early check-in or late check-out is subject to availability and may incur additional charges.</li>
            </ul>

            <h3>2. Cancellation & Refund Policy</h3>
            <ul>
                <li>Non-refundable bookings cannot be canceled or refunded.</li>
                <li>Refundable bookings may be canceled free of charge up to 24 hours before arrival.</li>
                <li>No-shows will be charged the full booking amount.</li>
            </ul>

            <h3>3. Guest Requirements</h3>
            <ul>
                <li>Valid government-issued ID or passport is required at check-in.</li>
                <li>Guests must be at least 18 years old to book a room.</li>
                <li>For syariah-compliant hotels, proof of marriage may be required for couples.</li>
            </ul>

            <h3>4. Payment</h3>
            <ul>
                <li>Payment can be made online or at the property, depending on booking type.</li>
                <li>A security deposit may be required upon check-in (cash or credit card).</li>
                <li>All additional charges during the stay must be settled upon check-out.</li>
            </ul>

            <h3>5. Smoking Policy</h3>
            <ul>
                <li>Smoking is not allowed in non-smoking rooms.</li>
                <li>Guests smoking in non-smoking areas will be fined.</li>
            </ul>

            <h3>6. Pet Policy</h3>
            <ul>
                <li>Pets are not allowed unless otherwise stated by the hotel.</li>
            </ul>

            <h3>7. Children & Extra Beds</h3>
            <ul>
                <li>Children are welcome; age limits may apply depending on room policy.</li>
                <li>Extra beds or baby cots may be available upon request and with additional fees.</li>
            </ul>

            <h3>8. Liability & Damages</h3>
            <ul>
                <li>Guests are responsible for any damage caused to the property during their stay.</li>
                <li>The hotel is not responsible for lost or stolen belongings not stored in the safe box.</li>
            </ul>

            <h3>9. Facilities & Services</h3>
            <ul>
                <li>Free Wi-Fi is available in designated areas or rooms, depending on hotel policy.</li>
                <li>Access to facilities (gym, pool, etc.) may be subject to operating hours and rules.</li>
            </ul>

            <h3>10. Prohibited Items & Behavior</h3>
            <ul>
                <li>Weapons, illegal drugs, and dangerous items are strictly prohibited.</li>
                <li>Guests must not engage in behavior that disturbs others or violates local laws.</li>
            </ul>

            <p>By proceeding with the booking, you agree to the above Terms and Conditions.</p>
            </section>
            ';
    }
}
