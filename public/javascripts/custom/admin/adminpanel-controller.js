app.controller('adminpanelMainCtrl', ['$scope', '$timeout', '$localStorage', '$location', '$window', '$http', function($scope, $timeout, $localStorage, $location ,$window, $http) {
     $scope.$on("$routeChangeSuccess", function () {
          if($location.url() == "/" || $location.url() == "/dashboard"){
               $scope.clsmenu1 = "active";
               $scope.clsmenu2 = "";
               $scope.clsmenu3 = "";
          }
          else if($location.url() == "/user"){
               $scope.clsmenu1 = "";
               $scope.clsmenu2 = "active";
               $scope.clsmenu3 = "";
          }
          else if($location.url() == "/kategori"){
               $scope.clsmenu1 = "";
               $scope.clsmenu2 = "";
               $scope.clsmenu3 = "active";
          }
     });



     // Kita dapat mengakses localstorage walaupun disimpan dalam variabel,
     // karena module ngStorage pada saat statement dibawah, operasi yang dilakukan
     // hanya memberikan alamat memori (pointer) bukan copy nilai ke variabel storange.
     $scope.storage = $localStorage;

     $scope.config = {
          headers : {
              'Content-Type': 'application/x-www-form-urlencoded'
          }
     }
}]);

app.controller('userCtrl', ['$scope', '$timeout', '$localStorage', '$location', '$window', '$http', function($scope, $timeout, $localStorage, $location ,$window, $http) {

}]);

app.controller('categoryCtrl', ['$scope', '$timeout', '$localStorage', '$location', '$window', '$http', function($scope, $timeout, $localStorage, $location ,$window, $http) {
     $scope.currentPage = 1; // Digunakan untuk Paging
     $scope.pageSize = 10; // Digunakan untuk Paging

     $scope.listOfCategories = [];
     $scope.updateDataCategories = function(){
               $http.get("/admin/kategori/" + $scope.storage.key + "/all", $scope.config)
               .then(
                   function(response){
                         $scope.listOfCategories = response.data;
                   }, 
                   function(response){
                         //alert("Load Categories failed! Check your internet connection.");
                         $scope.showAlert('#failed');
                   }
               );
     }
     $scope.$on("$routeChangeSuccess", function () {
          $scope.updateDataCategories();
     });

     $scope.searchKeyword = "";
     $scope.search = function(temp){
          $scope.searchKeyword = temp;
          //pagesShownFriends = 1;
     }

     $scope.newInput = "";
     $scope.tempInput = {};
     $scope.addInput = function(){
          $http.post("/admin/kategori/add", $.param(
          { 
               key : $scope.storage.key,
               nama : $scope.newInput
          }), 
          $scope.config)
          .then(
               function(response){
                    // Jika post berhasil disubmit maka tampilkan
                    $scope.showAlert('#success');
                    //alert("OK");
                    $scope.resetInput();
                    $scope.updateDataCategories();
               }, 
               function(response){
                    //alert("Post failed! Check your internet connection.");
                    $scope.showAlert('#failed');
               }
          ); 
     };
     $scope.resetInput = function(){
          $scope.newInput = "";
     };


     $scope.showAlert = function(id_Div){
          $('.alert-category').addClass('hidden')
          $(id_Div).removeClass('hidden');
     }

     $scope.hideAlert = function(id_Div){
          $(id_Div).addClass('hidden');
     };

     $scope.initEditCategory = function(category){
          // Fungsi Jquery
          if(typeof $scope.tempInput.id !== 'undefined' && typeof $scope.tempInput.nama !== 'undefined'){
               $scope.closeAllEditCategory();
          }

          // copy nilai ke variabel bukan menyimpan alamat memorinya (pointer).
          $scope.tempInput = angular.copy(category);
          $('.categoryTableRow' + '#' + $scope.tempInput.id + ' td > input').removeClass('disabled');
          $('.categoryTableRow' + '#' + $scope.tempInput.id + ' td > input').prop('disabled', false).focus();;
          $('.categoryTableRow' + '#' + $scope.tempInput.id + ' td > .init-button').addClass('hidden');
          $('.categoryTableRow' + '#' + $scope.tempInput.id + ' td > .save-button').removeClass('hidden');
          $('.categoryTableRow' + '#' + $scope.tempInput.id + ' td > .cancel-button').removeClass('hidden');
     };
     $scope.closeAllEditCategory = function(){
          // Fungsi Jquery dan JS (perulangan)
          $scope.listOfCategories[$scope.listOfCategories.map(function (category) {
            return category.id;
          }).indexOf($scope.tempInput.id)].nama = $scope.tempInput.nama;

          $('.categoryTableRow ' + ' td > input').addClass('disabled');
          $('.categoryTableRow ' + ' td > input').prop('disabled', true);
          $('.categoryTableRow ' + ' td > .init-button').removeClass('hidden');
          $('.categoryTableRow ' + ' td > .save-button').addClass('hidden');
          $('.categoryTableRow ' + ' td > .cancel-button').addClass('hidden');
     };
     $scope.editCategory = function(category){
          $http.post("/admin/kategori/update", $.param(
          { 
               key : $scope.storage.key,
               id : category.id,
               nama : category.nama,
          }), 
          $scope.config)
          .then(
               function(response){
                    // Jika post berhasil di-edit maka tampilkan
                    $scope.showAlert('#success2');
                    //alert("Edited");
                    $scope.tempInput = angular.copy(category);
                    $scope.closeCurrentEditCategory(category.id);
               }, 
               function(response){
                    //alert("Post failed! Check your internet connection.");
                    $scope.showAlert('#failed');
               }
          );
     };
     $scope.cancelEditCategory = function(xcategory){
          // map merupakan metode bawaan javascript yang digunakan untuk memetakan array yang ada
          // menjadi subarray (looping satu per satu elemen)

          // indexOf merupakan metode bawaan javascript yang digunakan untuk mencari index
          // dari array yang disediakan 

          $scope.listOfCategories[$scope.listOfCategories.map(function (category) {
            return category.id;
          }).indexOf(xcategory.id)].nama = $scope.tempInput.nama;
          $scope.closeCurrentEditCategory(xcategory.id);
     };
     $scope.closeCurrentEditCategory = function(id){
          // Fungsi Jquery
          $('.categoryTableRow' + '#' + id + ' td > input').addClass('disabled');
          $('.categoryTableRow' + '#' + id + ' td > input').prop('disabled', true);
          $('.categoryTableRow' + '#' + id + ' td > .init-button').removeClass('hidden');
          $('.categoryTableRow' + '#' + id + ' td > .save-button').addClass('hidden');
          $('.categoryTableRow' + '#' + id + ' td > .cancel-button').addClass('hidden');
     };

}]);