@component('mail::message')
Hello, {{ $firstname }}

Thanks for your registration on our new app. Codolog is a notes platform that makes you able to store any kind of texture information. It can work as document storage, code snippets or even a diary. it also has a markdown editor to let you take advantage of all text utilities.
What's makes Codolog the best is that everything in one place. You will have 2 main sections pages, categoires and that's it. You don't have to visit a new page or even to refresh your page.
Codolog currently on beta, we are willing to take this project into another level. Have fun with it. Share it with your friends, or anyone you like. Have a nice day.

Thanks,<br>
{{ config('app.name') }}
@endcomponent
