app.controller('adminpanelMainCtrl', ['statusUserDataPasser', '$scope', '$timeout', '$localStorage', '$location', '$window', '$http', function(statusUserDataPasser, $scope, $timeout, $localStorage, $location ,$window, $http) {
     //statusUserDataPasser lihat di public/custom/admin/adminpanel-service.js, anggap seperti kelas statis yg global
     
     // Kita dapat mengakses localstorage walaupun disimpan dalam variabel,
     // karena module ngStorage pada saat statement dibawah, operasi yang dilakukan
     // hanya memberikan alamat memori (pointer) bukan copy nilai ke variabel storange.
     $scope.storage = $localStorage;

     $scope.config = {
          headers : {
              'Content-Type': 'application/x-www-form-urlencoded'
          }
     }
     $scope.$on("$locationChangeStart", function (event, newUrl, oldUrl) {
          if($scope.storage.admin === false){
               $window.location.href = "/ERROR";     
          }
     });
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

     // Peroleh data diri Admin yang sedang login
     if(typeof $scope.storage.key !== 'undefined' && typeof $scope.storage.admin !== 'undefined'){
         $http.get("/user/config/" + $scope.storage.key, $scope.config)
          .then(
              function(response){
                    $scope.loggedUser = response.data[0];
              }, 
              function(response){
                    $('#failedLoad').modal('show');
              }
           );
     }

     // watch (secara realtime) untuk cek logout (baik terduga maupun tak terduga)
     $scope.$watch("storage.key", function(newVal, oldVal) {
          // cek apakah kosong (logout)
          if (typeof newVal === 'undefined') {
               $scope.logout();
          }
          // cek apakah key pada localstorage ditemper (percobaan hack)
          if(newVal != oldVal && (newVal !== "tempered" && typeof newVal !== 'undefined')){
               $scope.storage.key = "tempered";
               $('#failedTemper').modal('show');
          }
     },true);
     $scope.$watch("storage.admin", function(newVal, oldVal) {
          // cek apakah kosong (logout)
          if (typeof newVal === 'undefined') {
               $scope.logout();
          }
          // cek apakah admin pada localstorage ditemper (percobaan hack)
          if(newVal != oldVal && (newVal !== null && typeof newVal !== 'undefined')){
               $scope.storage.admin = null;
               $('#failedTemper').modal('show');
          }
     },true);

     // Fungsi untuk pergi ke beranda (Halaman User)
     $scope.gotoUserPage = function(){
          $window.location.href = "user/" + $scope.loggedUser.nama;       
     }

     // Fungsi Logout
     $scope.logout = function(){
          $localStorage.$reset();
          $window.location.href = "/";
     }
}]);

app.controller('userCtrl', ['statusUserDataPasser', '$scope', '$compile', '$timeout', '$localStorage', '$location', '$window', '$http', function(statusUserDataPasser, $scope, $compile, $timeout, $localStorage, $location ,$window, $http) {
     $scope.currentPage = 1; // Digunakan untuk Paging
     $scope.pageSize = 10; // Digunakan untuk Paging

     $scope.listOfUsers = [];
     $scope.listOfStatusUsers = [];
     $scope.updateDataStatusUser = function(){
               $http.get("/admin/status/" + $scope.storage.key + "/all", $scope.config)
               .then(
                   function(response){
                         $scope.listOfStatusUsers = response.data;
                   }, 
                   function(response){
                         //alert("Load Users failed! Check your internet connection.");
                         $scope.showAlert('#failed');
                   }
               );
     }
     $scope.updateDataUsers = function(){
               $http.get("/admin/user/" + $scope.storage.key + "/__alldata__", $scope.config)
               .then(
                   function(response){
                         $scope.listOfUsers = response.data;
                         
                         // Fungsi JS Biasa untuk Sorting berdasarkan Nilai Property pada Array Of Object.
                         function sortByKey(array, key) {
                             return array.sort(function(a, b) {
                                 var x = a[key]; var y = b[key];
                                 return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                             });
                         };
                         sortByKey($scope.listOfUsers, "nama");
                   }, 
                   function(response){
                         //alert("Load Users failed! Check your internet connection.");
                         $scope.showAlert('#failed');
                   }
               );
     }
     $scope.$on("$routeChangeSuccess", function () {
          $scope.updateDataStatusUser();
          $scope.updateDataUsers();
     });

     $scope.searchKeyword = "";
     $scope.search = function(temp){
          $scope.searchKeyword = temp;
     };

     $scope.tempInput = {};

     $scope.showAlert = function(id_Div){
          $('.alert-user').addClass('hidden')
          $(id_Div).removeClass('hidden');
     };

     $scope.hideAlert = function(id_Div){
          $(id_Div).addClass('hidden');
     };

     $scope.StatusUserModalMsg = "";

     $scope.showStatusUserModal = function(user, status_id){
          // Campuran Angular dan Jquery
          $scope.StatusUserModalMsg = "Apakah Anda yakin ingin mengubah Status User yang bernama " + user.nama + " menjadi Status " + $scope.listOfStatusUsers[status_id-1].nama + "?";
          statusUserDataPasser.setStatusUser({user, status_id});
          $('#statusUser').modal('show');
     };

     $scope.editStatusUser = function(){
          $scope.tempVar = statusUserDataPasser.loadStatusUser();
          $http.post("admin/userstat/update", $.param(
          { 
               key : $scope.storage.key,
               id :$scope.tempVar.user.id,
               status_id : $scope.tempVar.status_id
          }), 
          $scope.config)
          .then(
               function(response){
                    // Jika post berhasil disubmit maka tampilkan
                    $scope.showAlert('#success');
                    //alert("OK");
                    $scope.clearStatusUserModalData();
                    $scope.updateDataStatusUser();
                    $scope.updateDataUsers();
               }, 
               function(response){
                    //alert("Edit Status failed! Check your internet connection.");
                    $scope.showAlert('#failed');
               }
          ); 
     };

     $scope.clearStatusUserModalData = function(){
          $scope.StatusUserModalMsg = "";
          statusUserDataPasser.setStatusUser(null);
     };
}]);

app.controller('categoryCtrl', ['statusUserDataPasser', '$scope', '$timeout', '$localStorage', '$location', '$window', '$http', function(statusUserDataPasser, $scope, $timeout, $localStorage, $location ,$window, $http) {
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
     }

     $scope.newInput = "";
     $scope.tempInput = {};
     $scope.addCategory = function(){
          $http.post("/admin/kategori/add", $.param(
          { 
               key : $scope.storage.key,
               nama : $scope.newInput
          }), 
          $scope.config)
          .then(
               function(response){
                    // Jika post berhasil disubmit maka tampilkan

                    // Campuran Angular dan Jquery
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
                    $scope.updateDataCategories();
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