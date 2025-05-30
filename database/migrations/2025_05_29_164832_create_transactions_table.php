<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reservation_id')->constrained('reservations');
            $table->string('transaction_id', 50)->unique();
            $table->string('payment_method', 20)->nullable();
            $table->string('payment_status', 20)->default('pending');
            $table->string('payment_type', 20)->nullable();
            $table->float('subtotal');
            $table->float('discount')->default(0);
            $table->float('tax_amount')->default(0);
            $table->float('total_price')->default(0);
            $table->float('pay_now')->default(0);
            $table->float('balance_to_be_paid')->default(0);
            $table->string('promotion_code', 20)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
