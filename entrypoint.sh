#!/bin/bash

# Install Composer dependencies jika folder vendor tidak ada
if [ ! -d "vendor" ]; then
    composer install
fi

# Install npm dependencies jika folder node_modules tidak ada
if [ ! -d "node_modules" ]; then
    npm install
fi

# Generate application key jika belum ada
# if [ ! -f .env ]; then
#     cp .env.example .env
#     php artisan key:generate --force
# fi

php artisan migrate

# Jalankan Laravel server dan Vite
npm run dev &
php artisan serve --host=0.0.0.0 --port=8000