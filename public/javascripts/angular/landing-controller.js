app.controller('landingCtrl', ['$scope', '$location', function($scope, $location) {
     // Event yang dijalankan atau dipanggil route sudah berubah dan template sudah diload.
     $scope.$on("$routeChangeSuccess", function () {
          if($location.url() == "/" || $location.url() == "/login" || $location.url() == "/register"){
               $scope.clsmenu1 = "active";
               $scope.clsmenu2 = "";
               $scope.clsmenu3 = "";
          }
          else if($location.url() == "/features"){
               $scope.clsmenu1 = "";
               $scope.clsmenu2 = "active";
               $scope.clsmenu3 = "";
          }
          else if($location.url() == "/contact"){
               $scope.clsmenu1 = "";
               $scope.clsmenu2 = "";
               $scope.clsmenu3 = "active";
          }
     });
     $scope.switchmenu = function(i){
          if(i === 1 || i === 4 || i === 5){
               $scope.clsmenu1 = "active";
               $scope.clsmenu2 = "";
               $scope.clsmenu3 = "";
          }
          else if (i === 2){
               $scope.clsmenu1 = "";
               $scope.clsmenu2 = "active";
               $scope.clsmenu3 = "";
          }
          else if (i === 3){
               $scope.clsmenu1 = "";
               $scope.clsmenu2 = "";
               $scope.clsmenu3 = "active";
          }
     }
     $scope.login = function(){
          alert("Login");
     }
     $scope.register = function(){
          alert("Register");
     }
}]);