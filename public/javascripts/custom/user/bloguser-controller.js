app.controller('bloguserMainCtrl', ['articleDataPasser', '$scope', '$timeout', '$localStorage', '$location', '$window', '$http', function(articleDataPasser, $scope, $timeout, $localStorage, $location ,$window, $http) {

     //articleDataPasser lihat di public/javascripts/custom/user/bloguser-service.js, anggap seperti kelas statis yg global
     var pagesShown;
     var pageSize;

     // Penanda bahwa terjadi perubahan username akibat dari proses Update User oleh settingCtrl dibawah.
     $scope.isUsernameChanged = {
          status : null
     }

     $scope.$on("$routeChangeSuccess", function () {
          pagesShown = 1;
          pageSize = 5;
          if($scope.isUsernameChanged.status === false){
               $window.location.href = "/user/" + $scope.loggedUser.nama; + "#!" + $location.path();
               $scope.isUsernameChanged.status = null;
          }
          else{
               $window.document.title = "BLOG ENGINE"; // Ubah title pada tab browser
               $scope.updateAllPosts();
          }
     });

     // Kita dapat mengakses localstorage walaupun disimpan dalam variabel,
     // karena pada saat melakukan statement dibawah, operasi yang dilakukan sebenarnya
     // adalah memberikan alamat memori (pointer) bukan copy nilai ke variabel storange.
     $scope.storage = $localStorage;

     // watch (secara realtime) untuk cek logout (baik terduga maupun tak terduga)
      // watch (secara realtime) untuk cek logout (baik terduga maupun tak terduga)
     $scope.$watch("storage.key", function(newVal, oldVal) {
          // cek apakah kosong (logout)
          if (typeof newVal === 'undefined') {
               $scope.logout();
          }
          // cek apakah key pada localstorage akan diubah
          if(newVal != oldVal && (newVal !== "tempered" && typeof newVal !== 'undefined')){
               $http.get("/user/update/" + $scope.storage.key + "/" + $scope.loggedUser.id, $scope.config)
               .then(
                    function(response){
                         //jika tergolong percobaan hack (tempered) / token tidak valid / valid
                         if(response.data === true){
                              $scope.storage.key = newVal;
                         }
                         else{
                              
                              $scope.storage.key = "tempered";
                              $('#failed2').modal({
                                   backdrop: 'static',
                                   keyboard: false, 
                                   show: true
                              });
                         }
                    }, 
                    function(response){
                         if(response.status === 403){
                              $('#failed3').modal({
                                   backdrop: 'static',
                                   keyboard: false, 
                                   show: true
                              });
                         }
                         else if(response.status === 500){
                              $scope.storage.key = "tempered";
                              $('#failed2').modal({
                                   backdrop: 'static',
                                   keyboard: false, 
                                   show: true
                              });
                         }
                         else{
                              $('#failed').modal('show');
                         }
                    }
               );
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
               $('#failed2').modal({
                    backdrop: 'static',
                    keyboard: false, 
                    show: true
               });
          }
     },true);

     $scope.loggedUser = {};
     $scope.config = {
          headers : {
              'Content-Type': 'application/x-www-form-urlencoded'
          }
     }
     if($scope.storage.key === "tempered" || $scope.storage.admin === null){
          $('#failed3').modal({
               backdrop: 'static',
               keyboard: false, 
               show: true
          });
     }
     else if(typeof $scope.storage.key !== 'undefined' && typeof $scope.storage.admin !== 'undefined'){
         $http.get("/user/config/" + $scope.storage.key, $scope.config)
          .then(
              function(response){
               // Format Data yang dikembalikan : 
               // {
               //   "id": 1,
               //   "nama": "gerald",
               //   "password": "12345",
               //   "status_id": 1,
               //   "fotoprofil": "fotoprofil",
               //   "fotokronologi": "fotokronologi",
               //   "email": "adaaja@mail.com"
               // }
               $scope.loggedUser = response.data[0];
              }, 
              function(response){
                    //alert("Load failed! Back to homepage");
                    $('#failed3').modal({
                         backdrop: 'static',
                         keyboard: false, 
                         show: true
                    });
                    // $localStorage.$reset();
                    // $window.location.href = "/";
              }
           );
     }

     // watch (secara realtime, namun dihanya diperlukan 1 kali saja) 
     // mengecek untuk kecocokan data loggedUser dengan URL
     $scope.$watch("loggedUser.nama", function(newVal, oldVal) {
          // cek apakah data loggedUser dengan URL cocok.
          if(newVal){
               // Memakai Regex untuk mengekstrak username yang diinput di URL
               if(!(($location.absUrl()).match(/user\/\w+/g)[0] == "user/" + $scope.loggedUser.nama)){
                    //alert("Wrong user! Back to homepage");
                    //$localStorage.$reset();
                    if($scope.isUsernameChanged.status === true){
                         $scope.isUsernameChanged.status = false;
                    }
                    else{
                         $window.location.href = "/user/" + $scope.loggedUser.nama;
                    }

                    
               }
          }
     },true);

     $scope.updateAllPosts = function(){
          $http.get("/post/all/" + $scope.storage.key, $scope.config)
          .then(
               function(response){
                    // $scope.posts = response.data.post;
                    $scope.allPosts = [];
                    for(var i = 0; i<response.data.length; i++){
                         $scope.allPosts[i] = {
                              "id" : response.data[i].id_post,
                              "title" : response.data[i].title,
                              "content" : response.data[i].body,
                              "id_author" : response.data[i].id_user,
                              "author" : response.data[i].nama_user,
                              "date" : response.data[i].id_post,
                              "id_kategori" : response.data[i].id_kategori,
                              "kategori" : response.data[i].nama,

                              // IMG dengan array kosong (akan diload pada saat article diklik / diproses oleh articleCtrl)
                              "img" : [] 
                         }
                    }
               }, 
               function(response){
                    //alert("Load failed! Try to refresh this page.");]
                    if(response.status === 403){
                         $('#failed4').modal({
                              backdrop: 'static',
                              keyboard: false, 
                              show: true
                         });
                    }
                    else{
                         $('#failed').modal('show');
                    }
               }
          );
     }

     //fungsionalitas show more

     $scope.paginationLimit = function() {
      return pageSize * pagesShown;
     };

     $scope.hasMoreItemsToShow = function(filteredposts) {
      return pagesShown < ((filteredposts ? filteredposts.length : 0)  / pageSize);
     };

     $scope.showMoreItems = function() {
      pagesShown = pagesShown + 1;       
     }; 

     // end of show more

     $scope.readPost = function(post){
          articleDataPasser.setArticle(post);
     }


     // Fungsi untuk pergi ke admin panel
     $scope.gotoAdminPanel = function(){
          $http.get("/admin", $scope.config)
          .then(
               function(response){
                    if($scope.storage.admin === true){
                         $window.location.href = "/admin";     
                    }
                    else{
                         $window.location.href = "/ERROR";     
                    }
                    // (Tidak ada diterapkan konsep SPA antara Halaman User dan Admin Panel)
               }, 
               function(response){
                    if(response.status === 403){
                         $('#failed4').modal({
                              backdrop: 'static',
                              keyboard: false, 
                              show: true
                         });
                    }
                    else{
                         $('#failed').modal('show');
                    }
               }
          );   
     }

     // Fungsi Logout
     $scope.logout = function(){
          $localStorage.$reset();
          $window.location.href = "/";
     }
}]);

app.controller('articleCtrl', ['articleDataPasser', '$sce', '$scope', '$timeout' , '$location', '$http', '$window', function(articleDataPasser, $sce, $scope, $timeout, $location, $http, $window) {
     //articleDataPasser lihat di public/javascripts/custom/user/bloguser-service.js, anggap seperti kelas statis yg global
     $scope.post = articleDataPasser.loadArticle();     
     $scope.updateDataArticle = function(){
          $http.get("/post/" + $scope.storage.key + "/" + $location.path().substring(6), $scope.config)
          .then(
               function(response){
                    $scope.post = {
                         "id" : response.data.id_post,
                         "title" : response.data.title,
                         "content" : response.data.body,
                         "id_author" : response.data.user.id,
                         "author" : response.data.user.nama,
                         "date" : response.data.id_post,
                         "id_kategori" : response.data.id_kategori,
                         "kategori" : response.data.nama,

                         // IMG dengan array kosong (akan diload pada saat article diklik / diproses oleh articleCtrl)
                         "img" : [] 
                    }
                    for(var i = 0 ; i<response.data.img.length;i++){
                         $scope.post.img[i] = response.data.img[i].urlfoto;
                    }
                    $window.document.title = $scope.post.title;

                    $scope.disqusConfig = {
                        disqus_shortname: 'blogengineweb',
                        disqus_identifier: $scope.post.id,
                        disqus_url: $location.absUrl(),
                        disqus_title: $scope.post.title
                    };
               }, 
               function(response){
                    //alert("Load failed! Try to refresh this page.");
                    if(response.status === 403){
                         $('#failed4').modal({
                              backdrop: 'static',
                              keyboard: false, 
                              show: true
                         });
                    }
                    else{
                         $('#failed').modal('show');
                    }
               }
          );
     }
     $scope.getGambarArticle = function(){
          $http.get("/post/" + $scope.storage.key + "/" + $location.path().substring(6), $scope.config)
          .then(
               function(response){
                    $scope.post.img = [];
                    for(var i = 0 ; i<response.data.img.length;i++){
                         $scope.post.img[i] = response.data.img[i].urlfoto;
                    }
               }, 
               function(response){
                    //alert("Load failed! Try to refresh this page.");
                    if(response.status === 403){
                         $('#failed4').modal({
                              backdrop: 'static',
                              keyboard: false, 
                              show: true
                         });
                    }
                    else{
                         $('#failed').modal('show');
                    }
               }
          );
     }


     if($scope.post == null){
          $scope.updateDataArticle();
     }
     else{
          $window.document.title = $scope.post.title;
          $scope.disqusConfig = {
              disqus_shortname: 'blogengineweb',
              disqus_identifier: $scope.post.id,
              disqus_url: $location.absUrl(),
              disqus_title: $scope.post.title
          };
          $scope.getGambarArticle();
     }

     //  $sce.trustAsHtml (dengan parameter string) adalah fungsi yang melakukan validasi dari suatu string
     //  apakah string tersebut memang element HTML atau bukan.;
     $scope.trustAsHtml = $sce.trustAsHtml;
}]);

app.controller('friendsCtrl', ['$scope', '$timeout' , '$http', function($scope, $timeout, $http) {
     var pagesShownFriends1;
     var pageSizeFriends1;
     var pagesShownFriends2;
     var pageSizeFriends2;
     $scope.updateData = function(){
          $http.get("/user/cari/" + $scope.storage.key + "/__alldata__", $scope.config)
          .then(
               function(response){
                    $scope.unconfirmed  = response.data.confirm;
                    $scope.friends = response.data.pertemanan;

                    $scope.all = response.data.akunsendiri.concat(response.data.pertemanan, response.data.confirm, response.data.add, response.data.un_friend)
               }, 
               function(response){
                    //alert("Load failed! Try to refresh this page.");
                    if(response.status === 403){
                         $('#failed4').modal({
                              backdrop: 'static',
                              keyboard: false, 
                              show: true
                         });
                    }
                    else{
                         $('#failed').modal('show');
                    }
               }
          );
     }
     $scope.$on("$routeChangeSuccess", function () {
          pagesShownFriends1 = 1;
          pageSizeFriends1 = 12;
          pagesShownFriends2 = 1;
          pageSizeFriends2 = 12;
          $scope.updateData();
     });

     $scope.requestFriend = function(target){
          $http.get("/user/add/" + $scope.storage.key + "/" + target, $scope.config)
          .then(
               function(response){
                    //alert('Requested');
                    $('#success4').modal('show');
                    $scope.updateData();
               }, 
               function(response){
                    //alert("Request failed! Check your internet connection.");
                    if(response.status === 403){
                         $('#failed4').modal({
                              backdrop: 'static',
                              keyboard: false, 
                              show: true
                         });
                    }
                    else{
                         $('#failed').modal('show');
                    }
               }
          );

     };
     $scope.cancelrequestFriend = function(target){
          $http.delete("/user/delete/" + $scope.storage.key + "/" + target, $scope.config)
          .then(
               function(response){
                    //alert('Cancelled');
                    $('#success4').modal('show');
                    $scope.updateData();
               }, 
               function(response){
                    //alert("Cancellation failed! Check your internet connection.");
                    if(response.status === 403){
                         $('#failed4').modal({
                              backdrop: 'static',
                              keyboard: false, 
                              show: true
                         });
                    }
                    else{
                         $('#failed').modal('show');
                    }
               }
          );
     };
     $scope.acceptrequestFriend = function(target){
          $http.get("/user/confirm/" + $scope.storage.key + "/" + target, $scope.config)
          .then(
               function(response){
                    //alert('Confirmed');
                    $('#success4').modal('show');
                    $scope.updateData();
               }, 
               function(response){
                    //alert("Confirm failed! Check your internet connection.");
                    if(response.status === 403){
                         $('#failed4').modal({
                              backdrop: 'static',
                              keyboard: false, 
                              show: true
                         });
                    }
                    else{
                         $('#failed').modal('show');
                    }
               }
          );
     };
     $scope.rejectrequestFriend = function(target){
          $http.delete("/user/delete/" + $scope.storage.key + "/" + target, $scope.config)
          .then(
               function(response){
                    //alert('Rejected');
                    $('#success4').modal('show');
                    $scope.updateData();
               }, 
               function(response){
                    //alert("Reject failed! Check your internet connection.");
                    if(response.status === 403){
                         $('#failed4').modal({
                              backdrop: 'static',
                              keyboard: false, 
                              show: true
                         });
                    }
                    else{
                         $('#failed').modal('show');
                    }
               }
          );
     };
     $scope.delete = function(target){
          $http.delete("/user/delete/" + $scope.storage.key + "/" + target, $scope.config)
          .then(
               function(response){
                    //alert('Deleted');
                    $('#success4').modal('show');
                    $scope.updateData();
               }, 
               function(response){
                    //alert("Delete failed! Check your internet connection.");
                    if(response.status === 403){
                         $('#failed4').modal({
                              backdrop: 'static',
                              keyboard: false, 
                              show: true
                         });
                    }
                    else{
                         $('#failed').modal('show');
                    }
               }
          );
     };

     $scope.clsmenu1 = "active";
     $scope.clsisimenu1 = "";
     $scope.clsmenu2 = "";
     $scope.clsisimenu2 = "hidden";
     $scope.clsmenu3 = "";
     $scope.clsisimenu3 = "hidden";

     $scope.switchtab = function(i){
          $scope.updateData();
          if(i === 1){
               $scope.clsmenu1 = "active";
               $scope.clsisimenu1 = "";
               $scope.clsmenu2 = "";
               $scope.clsisimenu2 = "hidden";
               $scope.clsmenu3 = "";
               $scope.clsisimenu3 = "hidden";
          }
          else if (i === 2){
               $scope.clsmenu1 = "";
               $scope.clsisimenu1 = "hidden";
               $scope.clsmenu2 = "active";
               $scope.clsisimenu2 = "";
               $scope.clsmenu3 = "";
               $scope.clsisimenu3 = "hidden";
          }
          else if (i === 3){
               $scope.clsmenu1 = "";
               $scope.clsisimenu1 = "hidden";
               $scope.clsmenu2 = "";
               $scope.clsisimenu2 = "hidden";
               $scope.clsmenu3 = "active";
               $scope.clsisimenu3 = "";
          }
     }

     //fungsionalitas show more Friends 1

     $scope.paginationLimitFriends1 = function() {
      return pageSizeFriends1 * pagesShownFriends1;
     };

     $scope.hasMoreFriendsToShow1 = function(filteredfriends) {
      return pagesShownFriends1 < ((filteredfriends ? filteredfriends.length : 0) / pageSizeFriends1);
     };

     $scope.showMoreFriends1 = function() {
      pagesShownFriends1 = pagesShownFriends1 + 1;       
     }; 
     // end of show more

     //fungsionalitas show more Friends 2

     $scope.paginationLimitFriends2 = function() {
      return pageSizeFriends2 * pagesShownFriends2;
     };

     $scope.hasMoreFriendsToShow2 = function(filteredall) {
      return pagesShownFriends2 < ((filteredall ? filteredall.length : 0) / pageSizeFriends2);
     };

     $scope.showMoreFriends2 = function() {
      pagesShownFriends2 = pagesShownFriends2 + 1;       
     }; 
     // end of show more
     
     $scope.searchKeyword = "";
     $scope.search1 = function(temp){
          $scope.searchKeyword = temp;
          pagesShownFriends1 = 1;
     }

     $scope.searchKeyword2 = "";
     $scope.search2 = function(temp){
          $scope.searchKeyword2 = temp;
          pagesShownFriends2 = 1;
     }
}]);

app.controller('profileCtrl', ['articleDataPasser', '$scope', '$timeout', '$http', '$window', function(articleDataPasser, $scope, $timeout, $http, $window) {
     var pagesShownPosts;
     var pageSizePosts;
     var pagesShownFriends;
     var pageSizeFriends;
     $scope.updateDataUser = function(){
          $http.get("/user/detail/" + $scope.storage.key + "/" + $scope.loggedUser.id, $scope.config)
          .then(
               function(response){
                    $scope.friends = response.data.pertemanan.pertemanan;
                    $scope.userposts = [];
                    for(var i = 0; i<response.data.post.length; i++){
                         $scope.userposts[i] = {
                              "id" : response.data.post[i].id_post,
                              "title" : response.data.post[i].title,
                              "content" : response.data.post[i].body,
                              "id_author" : response.data.post[i].id_user,
                              "author" : response.data.nama,
                              "date" : response.data.post[i].id_post,
                              "id_kategori" : response.data.post[i].id_kategori,
                              "kategori" : response.data.post[i].nama,

                              // IMG dengan array kosong (akan diload pada saat article diklik / diproses oleh articleCtrl)
                              "img" : [] 
                         }
                    }
               }, 
               function(response){
                    //alert("Load failed! Try to refresh this page.");
                    if(response.status === 403){
                         $('#failed4').modal({
                              backdrop: 'static',
                              keyboard: false, 
                              show: true
                         });
                    }
                    else{
                         $('#failed').modal('show');
                    }
               }
          );
     }
     $scope.$on("$routeChangeSuccess", function () {
          pagesShownPosts = 1;
          pageSizePosts = 5;
          pagesShownFriends = 1;
          pageSizeFriends = 15;
          $window.document.title = $scope.loggedUser.nama;
          $scope.updateDataUser();
     });

     // Diganti dengan cara pemanggilan ng-bind di template user-profil.html
     //$scope.namauser = $scope.loggedUser.nama;
     //$scope.fotoprofiluser = $scope.loggedUser.fotoprofil;
     //$scope.fotokronologiuser = $scope.loggedUser.fotokronologi;

     $scope.searchKeyword = "";
     $scope.search = function(temp){
          $scope.searchKeyword = temp;
          pagesShownFriends = 1;
     }

     //fungsionalitas show more posts

     $scope.paginationLimitPosts = function() {
      return pageSizePosts * pagesShownPosts;
     };

     $scope.hasMoreItemsToShowPosts = function(filtereduserposts) {
      return pagesShownPosts < ((filtereduserposts ? filtereduserposts.length : 0) / pageSizePosts);
     };

     $scope.showMorePosts = function() {
      pagesShownPosts = pagesShownPosts + 1;       
     }; 

     // end of show more posts

     //fungsionalitas show more friends

     $scope.paginationLimitFriends = function() {
      return pageSizeFriends * pagesShownFriends;
     };

     $scope.hasMoreFriendsToShow = function(filteredfriends) {
      return pagesShownFriends < ((filteredfriends ? filteredfriends.length : 0) / pageSizeFriends);
     };

     $scope.showMoreFriends = function() {
      pagesShownFriends = pagesShownFriends + 1;       
     }; 

     // end of show more posts

     $scope.clsmenu1 = "active";
     $scope.clsisimenu1 = "";
     $scope.clsmenu2 = "";
     $scope.clsisimenu2 = "hidden";

     $scope.switchtab = function(i){
          $scope.updateDataUser();
          if(i === 1){
               $scope.clsmenu1 = "active";
               $scope.clsisimenu1 = "";
               $scope.clsmenu2 = "";
               $scope.clsisimenu2 = "hidden";
          }
          else if (i === 2){
               $scope.clsmenu1 = "";
               $scope.clsisimenu1 = "hidden";
               $scope.clsmenu2 = "active";
               $scope.clsisimenu2 = "";
          }
     }

     // Profile juga bisa melakukan operasi-operasi yang mirip dengan halaman pertemanan, antara lain :
     $scope.requestFriend = function(target){
          $http.get("/user/add/" + $scope.storage.key + "/" + target, $scope.config)
          .then(
               function(response){
                    //alert('Requested');
                    $('#success4').modal('show');
                    $scope.updateDataUser();
               }, 
               function(response){
                    //alert("Request failed! Check your internet connection.");
                    if(response.status === 403){
                         $('#failed4').modal({
                              backdrop: 'static',
                              keyboard: false, 
                              show: true
                         });
                    }
                    else{
                         $('#failed').modal('show');
                    }
               }
          );

     };
     $scope.cancelrequestFriend = function(target){
          $http.delete("/user/delete/" + $scope.storage.key + "/" + target, $scope.config)
          .then(
               function(response){
                    //alert('Cancelled');
                    $('#success4').modal('show');
                    $scope.updateDataUser();
               }, 
               function(response){
                    //alert("Cancellation failed! Check your internet connection.");
                    if(response.status === 403){
                         $('#failed4').modal({
                              backdrop: 'static',
                              keyboard: false, 
                              show: true
                         });
                    }
                    else{
                         $('#failed').modal('show');
                    }
               }
          );
     };
     $scope.acceptrequestFriend = function(target){
          $http.get("/user/confirm/" + $scope.storage.key + "/" + target, $scope.config)
          .then(
               function(response){
                    //alert('Confirmed');
                    $('#success4').modal('show');
                    $scope.updateDataUser();
               }, 
               function(response){
                    //alert("Confirm failed! Check your internet connection.");
                    if(response.status === 403){
                         $('#failed4').modal({
                              backdrop: 'static',
                              keyboard: false, 
                              show: true
                         });
                    }
                    else{
                         $('#failed').modal('show');
                    }
               }
          );
     };
     $scope.rejectrequestFriend = function(target){
          $http.delete("/user/delete/" + $scope.storage.key + "/" + target, $scope.config)
          .then(
               function(response){
                    //alert('Rejected');
                    $('#success4').modal('show');
                    $scope.updateDataUser();
               }, 
               function(response){
                    //alert("Reject failed! Check your internet connection.");
                    if(response.status === 403){
                         $('#failed4').modal({
                              backdrop: 'static',
                              keyboard: false, 
                              show: true
                         });
                    }
                    else{
                         $('#failed').modal('show');
                    }
               }
          );
     };
     $scope.delete = function(target){
          $http.delete("/user/delete/" + $scope.storage.key + "/" + target, $scope.config)
          .then(
               function(response){
                    //alert('Deleted');
                    $('#success4').modal('show');
                    $scope.updateDataUser();
               }, 
               function(response){
                    //alert("Delete failed! Check your internet connection.");
                    if(response.status === 403){
                         $('#failed4').modal({
                              backdrop: 'static',
                              keyboard: false, 
                              show: true
                         });
                    }
                    else{
                         $('#failed').modal('show');
                    }
               }
          );
     };

     // Metode-metode yang berhubungan dengan fitur Posting

     //articleDataPasser lihat di public/javascripts/bloguser-service.js, anggap seperti kelas statis yg global
     $scope.readPost = function(post){
          //alert('overriden1');
          articleDataPasser.setArticle(post);
     };
     $scope.showEditPostModal = function(post){
          // Memakai Jquery
          $scope.readPost(post);
          $('#newPost').modal('show');
          $("#newPostLabel").text('Edit Post');
          $("#helpgbrUtamaInputFile").text('**Berupa 1 File Gambar.');
          $("#btnSubmit").text('');
          // Sengaja ubah 2x , agar metode watch di PostCtrl dijalankan.
          // (timeout digunakan agar event watch dapat berjalan 2x).
          $("#btnSubmit").val('Post');
          $("#btnSubmit").text('Post');
          $timeout(function() {
               $("#btnSubmit").val('Save Changes');
               $("#btnSubmit").text('Save Changes');
          }, 200);
          $('#btnSubmit').removeClass('disabled'); // Enable visually
          $('#btnSubmit').prop('disabled', false); // Enable visually + functionally
          $('#gbrUtamaInputFile').prop('required', false);
          $("#btnClear").addClass('hidden');
     };
     $scope.showDeletePostModal = function(post){
          // Memakai Jquery
          $scope.readPost(post);
          $('#delete').modal('show');
     };
}]);

app.controller('friendProfileCtrl', ['articleDataPasser' ,'$scope', '$timeout', '$location', '$http', '$window', function(articleDataPasser, $scope, $timeout, $location, $http, $window) {
     var pagesShownPosts;
     var pageSizePosts;
     var pagesShownFriends;
     var pageSizeFriends;
     $scope.updateDataFriend = function(){
          //alert($location.path().substring(8));
          $http.get("/user/detail/" + $scope.storage.key + "/" + $location.path().substring(8), $scope.config)
          .then(
               function(response){
                    $scope.idteman = response.data.id;
                    $scope.namateman = response.data.nama;
                    $scope.fotoprofilteman = response.data.fotoprofil;
                    $scope.fotokronologiteman = response.data.fotokronologi;
                    $scope.friends = response.data.pertemanan.akunsendiri.concat(response.data.pertemanan.pertemanan, response.data.pertemanan.confirm, response.data.pertemanan.add, response.data.pertemanan.un_friend);
                    // $scope.posts = response.data.post;
                    $scope.posts = [];
                    for(var i = 0; i<response.data.post.length; i++){
                         $scope.posts[i] = {
                              "id" : response.data.post[i].id_post,
                              "title" : response.data.post[i].title,
                              "content" : response.data.post[i].body,
                              "id_author" : response.data.post[i].id_user,
                              "author" : response.data.nama,
                              "date" : response.data.post[i].id_post,
                              "id_kategori" : response.data.post[i].id_kategori,
                              "kategori" : response.data.post[i].nama,

                              // IMG dengan array kosong (akan diload pada saat article diklik / diproses oleh articleCtrl)
                              "img" : []
                         }
                    }
                    $window.document.title = $scope.namateman;
               }, 
               function(response){
                    //alert("Load failed! Try to refresh this page.");
                    if(response.status === 403){
                         $('#failed4').modal({
                              backdrop: 'static',
                              keyboard: false, 
                              show: true
                         });
                    }
                    else{
                         $('#failed').modal('show');
                    }
               }
          );
     }
     $scope.$on("$routeChangeSuccess", function () {
          pagesShownPosts = 1;
          pageSizePosts = 5;
          pagesShownFriends = 1;
          pageSizeFriends = 15;
          $scope.updateDataFriend();
     });
     
     $scope.searchKeyword = "";
     $scope.search = function(temp){
          $scope.searchKeyword = temp;
          pagesShownFriends = 1;
     }

     //fungsionalitas show more posts

     $scope.paginationLimitPosts = function() {
      return pageSizePosts * pagesShownPosts;
     };

     $scope.hasMoreItemsToShowPosts = function(filteredposts) {
      return pagesShownPosts < ((filteredposts ? filteredposts.length : 0) / pageSizePosts);
     };

     $scope.showMorePosts = function() {
      pagesShownPosts = pagesShownPosts + 1;       
     }; 

     // end of show more posts

     //fungsionalitas show more friends

     $scope.paginationLimitFriends = function() {
      return pageSizeFriends * pagesShownFriends;
     };

     $scope.hasMoreFriendsToShow = function(filteredfriends) {
      return pagesShownFriends < ((filteredfriends ? filteredfriends.length : 0) / pageSizeFriends);
     };

     $scope.showMoreFriends = function() {
      pagesShownFriends = pagesShownFriends + 1;       
     }; 

     // end of show more posts

     $scope.clsmenu1 = "active";
     $scope.clsisimenu1 = "";
     $scope.clsmenu2 = "";
     $scope.clsisimenu2 = "hidden";

     $scope.switchtab = function(i){
          $scope.updateDataFriend();
          if(i === 1){
               $scope.clsmenu1 = "active";
               $scope.clsisimenu1 = "";
               $scope.clsmenu2 = "";
               $scope.clsisimenu2 = "hidden";
          }
          else if (i === 2){
               $scope.clsmenu1 = "";
               $scope.clsisimenu1 = "hidden";
               $scope.clsmenu2 = "active";
               $scope.clsisimenu2 = "";
          }
     }

     //articleDataPasser lihat di public/javascripts/bloguser-service.js, anggap seperti kelas statis yg global
     $scope.readPost = function(post){
          //alert('overriden2');
          articleDataPasser.setArticle(post);
     }

     // Profile juga bisa melakukan operasi-operasi yang mirip dengan halaman pertemanan, antara lain :
     $scope.requestFriend = function(target){
          $http.get("/user/add/" + $scope.storage.key + "/" + target, $scope.config)
          .then(
               function(response){
                    //alert('Requested');
                    $('#success4').modal('show');
                    $scope.updateDataFriend();
               }, 
               function(response){
                    //alert("Request failed! Check your internet connection.");
                    if(response.status === 403){
                         $('#failed4').modal({
                              backdrop: 'static',
                              keyboard: false, 
                              show: true
                         });
                    }
                    else{
                         $('#failed').modal('show');
                    }
               }
          );

     };
     $scope.cancelrequestFriend = function(target){
          $http.delete("/user/delete/" + $scope.storage.key + "/" + target, $scope.config)
          .then(
               function(response){
                    //alert('Cancelled');
                    $('#success4').modal('show');
                    $scope.updateDataFriend();
               }, 
               function(response){
                    //alert("Cancellation failed! Check your internet connection.");
                    if(response.status === 403){
                         $('#failed4').modal({
                              backdrop: 'static',
                              keyboard: false, 
                              show: true
                         });
                    }
                    else{
                         $('#failed').modal('show');
                    }
               }
          );
     };
     $scope.acceptrequestFriend = function(target){
          $http.get("/user/confirm/" + $scope.storage.key + "/" + target, $scope.config)
          .then(
               function(response){
                    //alert('Confirmed');
                    $('#success4').modal('show');
                    $scope.updateDataFriend();
               }, 
               function(response){
                    //alert("Confirm failed! Check your internet connection.");
                    if(response.status === 403){
                         $('#failed4').modal({
                              backdrop: 'static',
                              keyboard: false, 
                              show: true
                         });
                    }
                    else{
                         $('#failed').modal('show');
                    }
               }
          );
     };
     $scope.rejectrequestFriend = function(target){
          $http.delete("/user/delete/" + $scope.storage.key + "/" + target, $scope.config)
          .then(
               function(response){
                    //alert('Rejected');
                    $('#success4').modal('show');
                    $scope.updateDataFriend();
               }, 
               function(response){
                    //alert("Reject failed! Check your internet connection.");
                    if(response.status === 403){
                         $('#failed4').modal({
                              backdrop: 'static',
                              keyboard: false, 
                              show: true
                         });
                    }
                    else{
                         $('#failed').modal('show');
                    }
               }
          );
     };
     $scope.delete = function(target){
          $http.delete("/user/delete/" + $scope.storage.key + "/" + target, $scope.config)
          .then(
               function(response){
                    //alert('Deleted');
                    $('#success4').modal('show');
                    $scope.updateDataFriend();
               }, 
               function(response){
                    //alert("Delete failed! Check your internet connection.");
                    if(response.status === 403){
                         $('#failed4').modal({
                              backdrop: 'static',
                              keyboard: false, 
                              show: true
                         });
                    }
                    else{
                         $('#failed').modal('show');
                    }
               }
          );
     };
}]);

app.controller('postCtrl', ['articleDataPasser', '$scope', '$timeout', '$http', '$route', function(articleDataPasser, $scope, $timeout, $http, $route) {
     $scope.currentPost = {
          id : null,
          title : "", 
          body : "",
          img : [],
          kategori_id : null
     }
     $scope.listOfCategories = [];

     $scope.loadCategories = function(){
          $http.get("/post/" + $scope.storage.key + "/kategori/all", $scope.config)
               .then(
                   function(response){
                         $scope.listOfCategories = response.data;
                   }, 
                   function(response){
                         //alert("Load Categories failed! Check your internet connection.");
                         if(response.status === 403){
                              $('#failed4').modal({
                              backdrop: 'static',
                              keyboard: false, 
                              show: true
                         });
                         }
                         else{
                              $('#failed').modal('show');
                         }
                        }
               );
     }

     // Load kategori
     $scope.loadCategories();

     // watch (secara realtime) untuk cek kembalian dari fungsi getPostButtonText
     $scope.$watch("getPostButtonText()", function(newVal, oldVal) {
          // cek perubahan nilai
          if (newVal === "Save Changes" && oldVal === "Post") {
               $scope.tempPost = articleDataPasser.loadArticle();
               $scope.currentPost = {
                    id : $scope.tempPost.id,
                    title : $scope.tempPost.title,
                    body : $scope.tempPost.content,
                    kategori_id : $scope.tempPost.id_kategori
               }
               $http.get("/post/" + $scope.storage.key + "/" + $scope.currentPost.id, $scope.config)
               .then(
                    function(response){
                         $scope.currentPost.img = response.data.img;
                    }, 
                    function(response){
                         //alert("Load failed! Try to refresh this page.");
                         if(response.status === 403){
                              $('#failed4').modal({
                                   backdrop: 'static',
                                   keyboard: false, 
                                   show: true
                              });
                         }
                         else{
                              $('#failed').modal('show');
                         }
                    }
               );
          }
     },true);


     $scope.initNewPostModal = function(){
          if($("#newPostLabel").text() == "Edit Post"){
               $scope.resetInput();
          }

          $("#newPostLabel").text("Buat Post Baru");
          $("#helpgbrUtamaInputFile").text('**Berupa 1 File Gambar dan Bersifat Wajib.');
          $("#btnSubmit").text('');
          $("#btnSubmit").val('Post');
          $("#btnSubmit").text('Post'); 
          $('#btnSubmit').addClass('disabled'); // Disables visually
          $('#btnSubmit').prop('disabled', true); // Disables visually + functionally
          $('#gbrUtamaInputFile').prop('required', true);
          $("#btnClear").removeClass('hidden');
     }
     $scope.submitPost = function(){
          $('#newPost').modal('hide');
          if($scope.getPostButtonText() == "Post"){
               // Insert ke DB, karena id gak ada (Post baru), pakai increment saja.
               $scope.fd = new FormData();
               $scope.fd.append("gbrUtamaInputFile", $scope.currentPost.gbrUtamaInputFile[0]);
               if($scope.currentPost.gbr2SampinganInputFile){
                    for(var i = 0; i <$scope.currentPost.gbr2SampinganInputFile.length ; i++){
                         $scope.fd.append("gbr2SampinganInputFile", $scope.currentPost.gbr2SampinganInputFile[i] )
                    }
               }
               // Upload gambar dulu, kemudian post contentnya.
               $http.post("/images/upload", $scope.fd, 
               {
                 transformRequest: angular.identity,
                 headers: {'Content-Type': undefined}
               })
               .then(
                         // post content
                         function(response){
                              // Jika gambar berhasil diupload, simpan namanya dalam 1 string
                              // hal ini disebabkan karena $.params tidak dapat mengirimkan array
                              // secara langsung
                              $scope.temp = "";
                              for(var i = 0; i < response.data.length;i++){
                                   $scope.temp += response.data[i].originalname;
                                   if(i != response.data.length - 1){
                                        $scope.temp += ",";
                                   }
                              }
                              //console.log(temp);
                              $http.post("/post", $.param(
                              { 
                                   key : $scope.storage.key,
                                   title : $scope.currentPost.title, 
                                   body : $scope.currentPost.body, 
                                   kategori_id : $scope.currentPost.kategori_id,
                                   img : $scope.temp
                              }), 
                              $scope.config)
                              .then(
                                   function(response){
                                        // Jika post berhasil disubmit maka tampilkan
                                        $('#success').modal('show');
                                        $scope.resetInput();
                                   }, 
                                   function(response){
                                        //alert("Post failed! Check your internet connection.");
                                        if(response.status === 403){
                                             $('#failed4').modal({
                                                  backdrop: 'static',
                                                  keyboard: false, 
                                                  show: true
                                             });
                                        }
                                        else{
                                             $('#failed').modal('show');
                                        }
                                   }
                              );  
                         }, 
                         function(response){
                              //alert("Post failed! Check your internet connection.");
                              if(response.status === 403){
                                   $('#failed4').modal({
                                        backdrop: 'static',
                                        keyboard: false, 
                                        show: true
                                   });
                              }
                              else{
                                   $('#failed').modal('show');
                              }
                         }
                    );           

          }
          else if ($scope.getPostButtonText() == "Save Changes"){
               // Update ke DB dengan berdasarkan id yang ada
               $scope.fd = new FormData();
               if($scope.currentPost.gbrUtamaInputFile){
                    $scope.fd.append("gbrUtamaInputFile", $scope.currentPost.gbrUtamaInputFile[0]);
               }
               if($scope.currentPost.gbr2SampinganInputFile){
                    for(var i = 0; i <$scope.currentPost.gbr2SampinganInputFile.length ; i++){
                         $scope.fd.append("gbr2SampinganInputFile", $scope.currentPost.gbr2SampinganInputFile[i] )
                    }
               }
               if(!($scope.currentPost.gbrUtamaInputFile) && !($scope.currentPost.gbr2SampinganInputFile)){
                    $scope.fd = null;
               }
               // Upload gambar dulu, kemudian post contentnya.
               $http.post("/images/upload", $scope.fd, 
               {
                 transformRequest: angular.identity,
                 headers: {'Content-Type': undefined}
               })
               .then(
                         // post content
                         function(response){
                              // Jika gambar berhasil diupload, simpan namanya dalam 1 string
                              // hal ini disebabkan karena $.params tidak dapat mengirimkan array
                              // secara langsung
                              $scope.temp = "";
                              for(var i = 0; i < response.data.length;i++){
                                   $scope.temp += response.data[i].originalname;
                                   if(i != response.data.length - 1){
                                        $scope.temp += ",";
                                   }
                              }
                              //console.log(temp);
                              $http.post("/post/update", $.param(
                              { 
                                   key : $scope.storage.key,
                                   id : $scope.currentPost.id,
                                   title : $scope.currentPost.title, 
                                   body : $scope.currentPost.body, 
                                   kategori_id : $scope.currentPost.kategori_id,
                                   img : $scope.temp

                              }), 
                              $scope.config)
                              .then(
                                   function(response){
                                        // Jika post berhasil di-edit maka tampilkan
                                        $('#success2').modal('show');
                                        $scope.resetInput();
                                   }, 
                                   function(response){
                                        //alert("Edit failed! Check your internet connection.");
                                        if(response.status === 403){
                                             $('#failed4').modal({
                                                  backdrop: 'static',
                                                  keyboard: false, 
                                                  show: true
                                             });
                                        }
                                        else{
                                             $('#failed').modal('show');
                                        }
                                   }
                              );   
                         }, 
                         function(response){
                              //alert("Post failed! Check your internet connection.");
                              if(response.status === 403){
                                   $('#failed4').modal({
                                        backdrop: 'static',
                                        keyboard: false, 
                                        show: true
                                   });
                              }
                              else{
                                   $('#failed').modal('show');
                              }
                         }
                    ); 
          }
     }

     $scope.deletePost = function(){
          $('#delete').modal('hide')
          // Baca post (untuk dipakai idnya) untuk post yang ingin dihapus;
          $scope.currentPost = articleDataPasser.loadArticle();

          // Delete data pada DB dengan berdasarkan id yang ada
          $http.delete("/post/delete/" + $scope.storage.key + "/" + $scope.currentPost.id, $scope.config)
          .then(
               function(response){
                    // Jika post berhasil dihapus maka tampilkan
                    articleDataPasser.setArticle(null);
                    $('#success3').modal('show');
               }, 
               function(response){
                    //alert("Delete failed! Check your internet connection.");
                    if(response.status === 403){
                         $('#failed4').modal({
                              backdrop: 'static',
                              keyboard: false, 
                              show: true
                         });
                    }
                    else{
                         $('#failed').modal('show');
                    }
               }
          );
          
     }

     $scope.resetInput = function(){
          // memakai jquery, karena perlu melakukan reset pada Input Type File juga.
          $('#formNewPost')[0].reset();
          $scope.currentPost.kategori_id = null;
     }

     $scope.getPostButtonText = function(){
          // Cara ambil teks button yg disupport IE
          var label = $("#btnSubmit").text(); 
          $("#btnSubmit").text('');
          var buttonValue = $("#btnSubmit").val();
          $("#btnSubmit").text(label);
          return buttonValue;
     }

     $scope.cekValiditas = function(){
          if($scope.currentPost.title.length > 0 && $scope.currentPost.body.length > 0){
               // Jquery
               $('#btnSubmit').removeClass('disabled'); // Enable visually
               $('#btnSubmit').prop('disabled', false); // Enable visually + functionally
          }
          else{
               // Jquery
               $('#btnSubmit').addClass('disabled'); // Disables visually
               $('#btnSubmit').prop('disabled', true); // Disables visually + functionally
          }
     }

     $scope.reloadPage = function(){
          // reload disini bukan REFRESH atau LOADING ULANG semuanya.
          // Syntax ini hanya load ulang bagian ng-View dengan templating dan controllernya
          // pemanggilnya.
          $route.reload();
     }

     $scope.tinymceOptions = {
               menubar: false,
               plugins: ['advlist autolink lists link image charmap print preview hr anchor pagebreak',
               'searchreplace wordcount visualblocks visualchars code fullscreen',
               'insertdatetime media nonbreaking save table contextmenu directionality',
               'emoticons template paste textcolor colorpicker textpattern imagetools'],
               toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
               toolbar2: 'preview media | forecolor backcolor',
               resize: 'vertical',
               height: '240px',
               image_advtab: true,
               setup : function(ed) {
                  ed.on('keyup', function() {
                    // Cukup naive karena kebetulan editor yang ada hanya 1
                     $scope.currentPost.body = tinyMCE.activeEditor.getContent();
                     $scope.cekValiditas();
                  });
               }
     };
}]);

app.controller('settingCtrl', ['$scope', '$timeout', '$http', '$route', function($scope, $timeout, $http, $route) {
     $scope.currentPasswordConfirm = "";
     $scope.currentData = {
          //username : $scope.loggedUser.nama,
          password : $scope.loggedUser.password,
          //email : $scope.loggedUser.email,
          fotoprofil : $scope.loggedUser.fotoprofil, 
          fotokronologi : $scope.loggedUser.fotokronologi
     };

     $scope.newData = {
          username : $scope.loggedUser.nama,
          password : $scope.loggedUser.password,
          passwordConfirm : $scope.loggedUser.password,
          email : $scope.loggedUser.email,
          emailConfirm : $scope.loggedUser.email,
          fotoprofil : null,
          fotokronologi : null
     };

     $scope.baseOfNewData = angular.copy($scope.newData);

     $scope.submitData = function(){
          if($scope.currentPasswordConfirm !== $scope.currentData.password){
               $scope.showAlert("#failedSetting1");
          }
          else if($scope.newData.password !== $scope.newData.passwordConfirm){
               $scope.showAlert("#failedSetting2");
          }
          else if($scope.newData.email !== $scope.newData.emailConfirm){
               $scope.showAlert("#failedSetting3");
          }
          else{
               $scope.fd = new FormData();

               // kalau foto profil dan foto kronologi ada perubahan
               if($scope.newData.fotoprofil && $scope.newData.fotokronologi){
                    $scope.fd.append("fotoprofil", $scope.newData.fotoprofil[0]);
                    $scope.fd.append("fotokronologi", $scope.newData.fotokronologi[0]);

                    // Upload gambar dulu, kemudian update data user baru.
                    $http.post("/images/upload", $scope.fd, 
                    {
                      transformRequest: angular.identity,
                      headers: {'Content-Type': undefined}
                    })
                    .then(
                         // update data user baru
                         function(response){
                              $http.post("/user/update", $.param(
                              {
                                   key : $scope.storage.key, 
                                   nama : $scope.newData.username,
                                   newpassword : $scope.newData.password, 
                                   fotoprofil : '/images/app/' + response.data[0].originalname, 
                                   fotokronologi : '/images/app/' + response.data[1].originalname,
                                   email : $scope.newData.email
                              }), 
                              $scope.config)
                              .then(
                                   function(response){
                                        // Jika update data user berhasil disubmit maka tampilkan
                                        $scope.showAlert("#successSetting");
                                             $scope.currentData = {
                                                  //username : $scope.loggedUser.nama,
                                                  password : response.data[0].password,
                                                  //email : $scope.loggedUser.email,
                                                  fotoprofil : response.data[0].fotoprofil, 
                                                  fotokronologi : response.data[0].fotokronologi
                                             };
                                             $scope.baseOfNewData = {
                                                  username : response.data[0].nama,
                                                  password : response.data[0].password,
                                                  passwordConfirm : response.data[0].password,
                                                  email : response.data[0].email,
                                                  emailConfirm : response.data[0].email,
                                                  fotoprofil : null,
                                                  fotokronologi : null
                                             };

                                             // isUsernameChange datang dari bloguserMainCtrl.
                                             $scope.isUsernameChanged.status = true;

                                             // Update Data Baru ke object loggedUser
                                             $scope.loggedUser.nama = response.data[0].nama;
                                             $scope.loggedUser.password = response.data[0].password;
                                             $scope.loggedUser.fotoprofil = response.data[0].fotoprofil;
                                             $scope.loggedUser.fotokronologi = response.data[0].fotokronologi;
                                             $scope.loggedUser.email = response.data[0].email;

                                             $scope.storage.key = response.data[1].key;
                                             $scope.resetInput();
                                   }, 
                                   function(response){
                                        if(response.status === 403){
                                             $('#failed4').modal({
                                                  backdrop: 'static',
                                                  keyboard: false, 
                                                  show: true
                                             });
                                        }
                                        else{
                                             $scope.showAlert("#failedSetting4");
                                        }
                                   }
                              );  
                         }, 
                         function(response){
                              if(response.status === 403){
                                   $('#failed4').modal({
                                        backdrop: 'static',
                                        keyboard: false, 
                                        show: true
                                   });
                              }
                              else{
                                   $scope.showAlert("#failedSetting4");
                              }
                         }
                    )
               }

               // kalau foto profil ada perubahan dan foto kronologi tidak ada perubahan
               else if($scope.newData.fotoprofil && (!($scope.newData.fotokronologi))){
                    $scope.fd.append("fotoprofil", $scope.newData.fotoprofil[0]);

                    // Upload gambar dulu, kemudian update data user baru.
                    $http.post("/images/upload", $scope.fd, 
                    {
                      transformRequest: angular.identity,
                      headers: {'Content-Type': undefined}
                    })
                    .then(
                         // update data user baru
                         function(response){
                              $http.post("/user/update", $.param(
                              {
                                   key : $scope.storage.key, 
                                   nama : $scope.newData.username,
                                   newpassword : $scope.newData.password, 
                                   fotoprofil : '/images/app/' + response.data[0].originalname, 
                                   fotokronologi : $scope.currentData.fotokronologi,
                                   email : $scope.newData.email
                              }), 
                              $scope.config)
                              .then(
                                   function(response){
                                        // Jika update data user berhasil disubmit maka tampilkan
                                        $scope.showAlert("#successSetting");
                                             $scope.currentData = {
                                                  //username : $scope.loggedUser.nama,
                                                  password : response.data[0].password,
                                                  //email : $scope.loggedUser.email,
                                                  fotoprofil : response.data[0].fotoprofil, 
                                                  fotokronologi : response.data[0].fotokronologi
                                             };
                                             $scope.baseOfNewData = {
                                                  username : response.data[0].nama,
                                                  password : response.data[0].password,
                                                  passwordConfirm : response.data[0].password,
                                                  email : response.data[0].email,
                                                  emailConfirm : response.data[0].email,
                                                  fotoprofil : null,
                                                  fotokronologi : null
                                             };

                                             // isUsernameChange datang dari bloguserMainCtrl.
                                             $scope.isUsernameChanged.status = true;

                                             // Update Data Baru ke object loggedUser
                                             $scope.loggedUser.nama = response.data[0].nama;
                                             $scope.loggedUser.password = response.data[0].password;
                                             $scope.loggedUser.fotoprofil = response.data[0].fotoprofil;
                                             $scope.loggedUser.fotokronologi = response.data[0].fotokronologi;
                                             $scope.loggedUser.email = response.data[0].email;

                                             $scope.storage.key = response.data[1].key;
                                             $scope.resetInput();
                                   }, 
                                   function(response){
                                        if(response.status === 403){
                                             $('#failed4').modal({
                                                  backdrop: 'static',
                                                  keyboard: false, 
                                                  show: true
                                             });
                                        }
                                        else{
                                             $scope.showAlert("#failedSetting4");
                                        }
                                   }
                              );  
                         }, 
                         function(response){
                              if(response.status === 403){
                                   $('#failed4').modal({
                                        backdrop: 'static',
                                        keyboard: false, 
                                        show: true
                                   });
                              }
                              else{
                                   $scope.showAlert("#failedSetting4");
                              }
                         }
                    );
               }

               // kalau foto profil tidak ada perubahan dan foto kronologi ada perubahan
               else if((!($scope.newData.fotoprofil)) && $scope.newData.fotokronologi){
                    $scope.fd.append("fotokronologi", $scope.newData.fotokronologi[0]);

                    // Upload gambar dulu, kemudian update data user baru.
                    $http.post("/images/upload", $scope.fd, 
                    {
                      transformRequest: angular.identity,
                      headers: {'Content-Type': undefined}
                    })
                    .then(
                         // update data user baru
                         function(response){
                              $http.post("/user/update", $.param(
                              {
                                   key : $scope.storage.key, 
                                   nama : $scope.newData.username,
                                   newpassword : $scope.newData.password, 
                                   fotoprofil : $scope.currentData.fotoprofil, 
                                   fotokronologi : '/images/app/' + response.data[0].originalname,
                                   email : $scope.newData.email
                              }), 
                              $scope.config)
                              .then(
                                   function(response){
                                        // Jika update data user berhasil disubmit maka tampilkan
                                        $scope.showAlert("#successSetting");
                                             $scope.currentData = {
                                                  //username : $scope.loggedUser.nama,
                                                  password : response.data[0].password,
                                                  //email : $scope.loggedUser.email,
                                                  fotoprofil : response.data[0].fotoprofil, 
                                                  fotokronologi : response.data[0].fotokronologi
                                             };
                                             $scope.baseOfNewData = {
                                                  username : response.data[0].nama,
                                                  password : response.data[0].password,
                                                  passwordConfirm : response.data[0].password,
                                                  email : response.data[0].email,
                                                  emailConfirm : response.data[0].email,
                                                  fotoprofil : null,
                                                  fotokronologi : null
                                             };

                                             // isUsernameChange datang dari bloguserMainCtrl.
                                             $scope.isUsernameChanged.status = true;

                                             // Update Data Baru ke object loggedUser
                                             $scope.loggedUser.nama = response.data[0].nama;
                                             $scope.loggedUser.password = response.data[0].password;
                                             $scope.loggedUser.fotoprofil = response.data[0].fotoprofil;
                                             $scope.loggedUser.fotokronologi = response.data[0].fotokronologi;
                                             $scope.loggedUser.email = response.data[0].email;

                                             $scope.storage.key = response.data[1].key;
                                             $scope.resetInput();
                                   }, 
                                   function(response){
                                        if(response.status === 403){
                                             $('#failed4').modal({
                                                  backdrop: 'static',
                                                  keyboard: false, 
                                                  show: true
                                             });
                                        }
                                        else{
                                             $scope.showAlert("#failedSetting4");
                                        }
                                   }
                              );  
                         }, 
                         function(response){
                              if(response.status === 403){
                                   $('#failed4').modal({
                                        backdrop: 'static',
                                        keyboard: false, 
                                        show: true
                                   });
                              }
                              else{
                                   $scope.showAlert("#failedSetting4");
                              }
                         }
                    );
               }

               // kalau foto profil dan foto kronologi tidak ada perubahan
               else if((!($scope.newData.fotoprofil)) && (!($scope.newData.fotokronologi))){
                    $http.post("/user/update", $.param(
                    {
                         key : $scope.storage.key, 
                         nama : $scope.newData.username,
                         newpassword : $scope.newData.password, 
                         fotoprofil : $scope.currentData.fotoprofil, 
                         fotokronologi : $scope.currentData.fotokronologi,
                         email : $scope.newData.email
                    }), 
                    $scope.config)
                    .then(
                         function(response){
                              // Jika update data user berhasil disubmit maka tampilkan
                              $scope.showAlert("#successSetting");
                                   $scope.currentData = {
                                        //username : $scope.loggedUser.nama,
                                        password : response.data[0].password,
                                        //email : $scope.loggedUser.email,
                                        fotoprofil : response.data[0].fotoprofil, 
                                        fotokronologi : response.data[0].fotokronologi
                                   };
                                   $scope.baseOfNewData = {
                                        username : response.data[0].nama,
                                        password : response.data[0].password,
                                        passwordConfirm : response.data[0].password,
                                        email : response.data[0].email,
                                        emailConfirm : response.data[0].email,
                                        fotoprofil : null,
                                        fotokronologi : null
                                   };

                                   // isUsernameChange datang dari bloguserMainCtrl.
                                   $scope.isUsernameChanged.status = true;

                                   // Update Data Baru ke object loggedUser
                                   $scope.loggedUser.nama = response.data[0].nama;
                                   $scope.loggedUser.password = response.data[0].password;
                                   $scope.loggedUser.fotoprofil = response.data[0].fotoprofil;
                                   $scope.loggedUser.fotokronologi = response.data[0].fotokronologi;
                                   $scope.loggedUser.email = response.data[0].email;

                                   $scope.storage.key = response.data[1].key;
                                   $scope.resetInput();
                         }, 
                         function(response){
                              if(response.status === 403){
                                   $('#failed4').modal({
                                        backdrop: 'static',
                                        keyboard: false, 
                                        show: true
                                   });
                              }
                              else{
                                   $scope.showAlert("#failedSetting4");
                              }
                         }
                    );
               }
               
          }         
     };

     $scope.resetInput = function(){
          $('#fotoProfilInputFile').val(null);
          $('#fotoKronologiInputFile').val(null);
          $scope.newData = angular.copy($scope.baseOfNewData);
          $scope.currentPasswordConfirm = "";
     };

     $scope.showAlert = function(id_Div){
          $('.alert-setting').addClass('hidden');
          $(id_Div).removeClass('hidden');
          $('html, body').animate({
              scrollTop: ($(id_Div).offset().top - 390)
          },500);
     };

     $scope.hideAlert = function(id_Div){
          $(id_Div).addClass('hidden');
     };

}]);
