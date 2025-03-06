FROM php:8.2

# Install dependencies
RUN apt-get update -y && apt-get install -y \
    openssl zip unzip git libpq-dev curl \
    nodejs npm

# Install Node.js and npm
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql

# Set working directory
WORKDIR /app

# Copy composer files first for better caching
COPY composer.json composer.lock ./

# Copy package.json files
COPY package.json package-lock.json* ./

# Set directory permissions
RUN chown -R www-data:www-data /app

# Expose port
EXPOSE 8000

# Entrypoint script
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]