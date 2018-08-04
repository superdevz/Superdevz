<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="UTF-8">
    <title>Codolog | Developers reminder</title>
    <link href="https://fonts.googleapis.com/css?family=Nanum+Gothic|Quando|Varela+Round" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="css/app.css">
    <script type="text/javascript" src="javascript/vendor.js"></script>
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>

    <div id="app"></div>

    @routes
    <script type="text/javascript" src="javascript/app.js"></script>
</body>
</html>