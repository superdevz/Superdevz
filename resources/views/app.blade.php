<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="UTF-8">
    <title>Codolog | Developers reminder</title>
    <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"></script>
    <script>
        WebFont.load({
            google: {
                families: ['Source Sans Pro:400,700', 'Alegreya Sans:400,700']
            }
        });
    </script>
    <link rel="stylesheet" type="text/css" href="css/app.css">
    <script type="text/javascript" src="javascript/vendor.js"></script>
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>

    <div id="app"></div>

    @routes
    <script type="text/javascript" src="javascript/app.js"></script>
    <!-- Global Site Tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-67918939-2"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-67918939-2');
    </script>
</body>
</html>