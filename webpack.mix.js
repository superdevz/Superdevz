let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.setResourceRoot('http://codolog.beta/')
    .js('resources/assets/javascript/app.js', 'public/javascript')
    .sass('resources/assets/sass/app.scss', 'public/css')
    .scripts([
        'resources/assets/javascript/fontawesome.js'
    ], 'public/javascript/vendor.js')
    .copyDirectory('resources/assets/images', 'public/images');