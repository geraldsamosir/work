var app = angular.module('bloguser',['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
        $routeProvider
            // route for the home page
            .when('/post/:post', {
                templateUrl : 'dummy/post/2'
                //controller  : 'mainController'
            })
            // Load main page
            .when('/', {
                templateUrl : 'home' //(Lihat routing di user js)
                //controller  : 'aboutController'
            })
            // Load main page if wrong address (probably useless due to back-end)
            .otherwise({
                redirectTo : '/'
            })

            // route for the contact page
    });

app.controller('bloguserCtrl', ['$scope', '$timeout' , function($scope, $timeout) {
  
}]);
