app.config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl : '/views/pages/landing/home.html'
            })
            .when('/features', {
                templateUrl : '/views/pages/landing/features.html'
            })
            .when('/contact', {
                templateUrl : '/views/pages/landing/contact.html',
            })
            .when('/login', {
                templateUrl : '/views/pages/landing/login.html'
            })
            .when('/register', {
                templateUrl : '/views/pages/landing/register.html'
            })
            .otherwise({
                redirectTo : '/'
            })
    });