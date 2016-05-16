app.config(function($routeProvider, $locationProvider) {
        $routeProvider
            // Load main page
            .when('/', {
                templateUrl : '/views/pages/app/user/beranda.html'
                //controller  : 'aboutController'
            })
            .when('/beranda', {
                templateUrl : '/views/pages/app/user/beranda.html'
                //controller  : 'aboutController'
            })
            .when('/pertemanan', {
                templateUrl : '/views/pages/app/user/pertemanan.html',
                controller  : 'friendsCtrl'
            })
            .when('/profil', {
                templateUrl : '/views/pages/app/user/profil.html'
                //controller  : 'aboutController'
            })
            .when('/post-:postid', {
                templateUrl : '/views/pages/app/user/artikel.html'
                //controller  : 'aboutController'
            })
            // Load main page if wrong address (probably useless due to back-end)
            .otherwise({
                redirectTo : '/'
            })

            // route for the contact page
    });