app.config(function($routeProvider, $locationProvider) {
        $routeProvider
            // Load main page
            .when('/', {
                templateUrl : '/views/pages/admin/dashboard.html'
                //controller  : 'aboutController'
            })
            .when('/dashboard', {
                templateUrl : '/views/pages/admin/dashboard.html'
                //controller  : 'aboutController'
            })
            .when('/user', {
                templateUrl : '/views/pages/admin/user.html',
                controller  : 'userCtrl'
            })
            .when('/kategori', {
                templateUrl : '/views/pages/admin/kategori.html',
                controller  : 'categoryCtrl'
            })
            // Load main page if wrong address (probably useless due to back-end)
            .otherwise({
                redirectTo : '/'
            })
    });