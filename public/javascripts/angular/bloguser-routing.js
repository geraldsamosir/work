var app = angular.module('bloguser'); // memakai blog user dr controller, krn itu tidak ada parameter kedua.

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
            .when('/carikawan', {
                templateUrl : '/views/pages/app/user/carikawan.html'
                //controller  : 'aboutController'
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