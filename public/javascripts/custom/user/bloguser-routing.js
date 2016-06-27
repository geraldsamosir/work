app.config(function($routeProvider, $locationProvider) {
        $routeProvider
            // Load main page
            .when('/', {
                templateUrl : '/views/pages/user/beranda.html'
                //controller  : 'aboutController'
            })
            .when('/beranda', {
                templateUrl : '/views/pages/user/beranda.html'
                //controller  : 'aboutController'
            })
            .when('/pertemanan', {
                templateUrl : '/views/pages/user/pertemanan.html',
                controller  : 'friendsCtrl'
            })
            .when('/profil', {
                templateUrl : '/views/pages/user/user-profil.html',
                controller  : 'profileCtrl'
            })
            .when('/pengaturan', {
                templateUrl : '/views/pages/user/pengaturan.html',
                controller  : 'settingCtrl'
            })
            .when('/post-:postid', {
                templateUrl : '/views/pages/user/artikel.html',
                controller  : 'articleCtrl'
            })
            .when('/person-:personid', {
                templateUrl : '/views/pages/user/friend-profil.html',
                controller  : 'friendProfileCtrl'
            })
            // Load main page if wrong address (probably useless due to back-end)
            .otherwise({
                redirectTo : '/'
            })

            $locationProvider.html5Mode(false).hashPrefix("!");
    });