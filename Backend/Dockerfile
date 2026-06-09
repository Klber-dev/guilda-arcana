FROM php:8.5-apache

RUN docker-php-ext-install pdo pdo_mysql
#sed -ri é pra substituir o DocumentRoot do apache para a pasta Public, onde estão os arquivos index.php e .htaccess que são os pontos de entrada da aplicação. Assim, quando o container for iniciado, ele vai servir os arquivos da pasta Public em vez de servir os arquivos da raiz do projeto, garantindo que as rotas e o acesso aos recursos funcionem corretamente.
RUN sed -ri \
    -e 's!/var/www/html!/var/www/html/Public!g' \
    /etc/apache2/sites-available/*.conf

COPY . /var/www/html