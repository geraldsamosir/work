app.controller('landingCtrl', ['$scope', '$location', '$http', '$localStorage', '$window', function($scope, $location, $http, $localStorage, $window) {
      $scope.config = {
          headers : {
              'Content-Type': 'application/x-www-form-urlencoded'
          }
      }
     // Event yang dijalankan atau dipanggil ketika route hendak berubah (template belum diload).
     $scope.$on("$routeChangeStart", function () {
          // Jika ditemukan token, langsung redirect ke halaman user.
          if($localStorage.key){
              $http.get("/user/config/" + $localStorage.key, $scope.config)
               .then(
                   function(response){
                      $window.location.href = "/user/" + response.data[0].nama;
                   }, 
                   function(response){
                      // Do nothing
                   }
                );
          }
     });
     // Event yang dijalankan atau dipanggil ketika route sudah berubah dan template sudah diload.
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
     $scope.datalogin = {
          username : "",
          password : ""
     }
     $scope.login = function(){
          $http.post("/login", $.param($scope.datalogin), $scope.config)
             .then(
                 function(response){
                    $localStorage.$default({
                        key: response.data.key,
                    });
                    $window.location.href = "/user/" + $scope.datalogin.username;
                 }, 
                 function(response){
                   alert(response.data);
                 }
          );
     }
     $scope.dataregister = {
          username : "",
          password : "",
          email : ""
     }
     $scope.register = function(){
          $http.post("/register", $.param($scope.dataregister), $scope.config)
             .then(
                 function(response){
                    $localStorage.$default({
                        key: response.data.key,
                    });
                    $window.location.href = "/user/" + $scope.dataregister.username;
                 }, 
                 function(response){
                   alert(response.data);
                 }
          );
     }
}]);