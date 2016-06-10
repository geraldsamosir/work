app.controller('bloguserMainCtrl', ['articleDataPasser', '$scope', '$timeout', '$localStorage', '$location', '$window', '$http', function(articleDataPasser, $scope, $timeout, $localStorage, $location ,$window, $http) {

     //articleDataPasser lihat di public/javascripts/bloguser-service.js, anggap seperti kelas statis yg global
     var pagesShown;
     var pageSize;

     $scope.$on("$routeChangeSuccess", function () {
          pagesShown = 1;
          pageSize = 5;
          $window.document.title = "BLOG ENGINE"; // Ubah title pada tab browser
          $scope.updateAllPosts();
     });

     // Kita dapat mengakses localstorage walaupun disimpan dalam variabel,
     // karena pada saat melakukan statement dibawah, operasi yang dilakukan sebenarnya
     // adalah memberikan alamat memori (pointer) bukan copy nilai ke variabel storange.
     $scope.storage = $localStorage;

     // watch (secara realtime) untuk cek logout (baik terduga maupun tak terduga)
     $scope.$watch("storage.key", function(newVal, oldVal) {
          // cek apakah kosong (logout)
          if (typeof newVal === 'undefined') {
               $scope.logout();
          }
          // cek apakah key pada localstorage ditemper (percobaan hack)
          if(newVal != oldVal && (newVal !== "tempered" && typeof newVal !== 'undefined')){
               $scope.storage.key = "tempered";
               $('#failed2').modal('show');
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
               $('#failed2').modal('show');
          }
     },true);

     $scope.loggedUser = {};
     $scope.config = {
          headers : {
              'Content-Type': 'application/x-www-form-urlencoded'
          }
     }
     if(typeof $scope.storage.key !== 'undefined' && typeof $scope.storage.admin !== 'undefined'){
         $http.get("/user/config/" + $scope.storage.key, $scope.config)
          .then(
              function(response){
                    $scope.loggedUser = response.data[0];
              }, 
              function(response){
                    //alert("Load failed! Back to homepage");
                    $('#failed3').modal('show');
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
                    $window.location.href = "/user/" + $scope.loggedUser.nama;
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
                              // "fotoprofil": "",
                              // "fotokronologi": "",
                              // IMG sementara
                              "img" : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"] 
                         }
                    }
               }, 
               function(response){
                    //alert("Load failed! Try to refresh this page.");
                    $('#failed').modal('show');
               }
          );
     }

     //   $scope.allPosts = [{
	// 	id : Math.round(Math.random() * 100 ).toString(),
	// 	title : "A1I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
	// 	img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
	// 	content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>",
	// 	author : "Start Bootstrap",
	// 	date : "24 September 2015"
	// },
	// {
	// 	id : Math.round(Math.random() * 100 ).toString(),
	// 	title : "A2I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
	// 	img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
	// 	content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
 //                    + 
 //                    "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
	// 				+
 //                    "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
 //                    +
 //                    "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
 //                    +
 //                    "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
 //                    +
 //                    "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
 //                    +
 //                    "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
 //                    +
 //                    "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
 //                    +
 //                    "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
	// 	author : "Start Bootstrap",
	// 	date : "24 September 2015"
	// },
	// {
	// 	id : Math.round(Math.random() * 100 ).toString(),
	// 	title : "A3I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
	// 	img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
	// 	content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
 //                    + 
 //                    "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
	// 				+
 //                    "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
 //                    +
 //                    "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
 //                    +
 //                    "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
 //                    +
 //                    "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
 //                    +
 //                    "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
 //                    +
 //                    "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
 //                    +
 //                    "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
	// 	author : "Start Bootstrap",
	// 	date : "24 September 2015"
	// },
	// {
	// 	id : Math.round(Math.random() * 100 ).toString(),
	// 	title : "A4I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
	// 	img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
	// 	content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
 //                    + 
 //                    "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
	// 				+
 //                    "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
 //                    +
 //                    "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
 //                    +
 //                    "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
 //                    +
 //                    "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
 //                    +
 //                    "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
 //                    +
 //                    "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
 //                    +
 //                    "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
	// 	author : "Start Bootstrap",
	// 	date : "24 September 2015"
	// },
 //     {
 //          id : Math.round(Math.random() * 100 ).toString(),
 //          title : "A5I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
 //          img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
 //          content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
 //                    + 
 //                    "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
 //                         +
 //                    "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
 //                    +
 //                    "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
 //                    +
 //                    "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
 //                    +
 //                    "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
 //                    +
 //                    "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
 //                    +
 //                    "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
 //                    +
 //                    "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
 //          author : "Start Bootstrap",
 //          date : "24 September 2015"
 //     },
 //     {
 //          id : Math.round(Math.random() * 100 ).toString(),
 //          title : "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
 //          img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
 //          content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
 //                    + 
 //                    "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
 //                         +
 //                    "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
 //                    +
 //                    "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
 //                    +
 //                    "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
 //                    +
 //                    "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
 //                    +
 //                    "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
 //                    +
 //                    "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
 //                    +
 //                    "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
 //          author : "Start Bootstrap",
 //          date : "24 September 2015"
 //     },
 //     {
 //          id : Math.round(Math.random() * 100 ).toString(),
 //          title : "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
 //          img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
 //          content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
 //                    + 
 //                    "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
 //                         +
 //                    "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
 //                    +
 //                    "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
 //                    +
 //                    "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
 //                    +
 //                    "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
 //                    +
 //                    "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
 //                    +
 //                    "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
 //                    +
 //                    "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
 //          author : "Start Bootstrap",
 //          date : "24 September 2015"
 //     },
 //     {
 //          id : Math.round(Math.random() * 100 ).toString(),
 //          title : "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
 //          img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
 //          content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
 //                    + 
 //                    "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
 //                         +
 //                    "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
 //                    +
 //                    "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
 //                    +
 //                    "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
 //                    +
 //                    "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
 //                    +
 //                    "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
 //                    +
 //                    "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
 //                    +
 //                    "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
 //          author : "Start Bootstrap",
 //          date : "24 September 2015"
 //     },
 //     {
 //          id : Math.round(Math.random() * 100 ).toString(),
 //          title : "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
 //          img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
 //          content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
 //                    + 
 //                    "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
 //                         +
 //                    "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
 //                    +
 //                    "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
 //                    +
 //                    "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
 //                    +
 //                    "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
 //                    +
 //                    "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
 //                    +
 //                    "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
 //                    +
 //                    "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
 //          author : "Start Bootstrap",
 //          date : "24 September 2015"
 //     },
 //     {
 //          id : Math.round(Math.random() * 100 ).toString(),
 //          title : "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
 //          img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
 //          content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
 //                    + 
 //                    "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
 //                         +
 //                    "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
 //                    +
 //                    "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
 //                    +
 //                    "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
 //                    +
 //                    "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
 //                    +
 //                    "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
 //                    +
 //                    "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
 //                    +
 //                    "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
 //          author : "Start Bootstrap",
 //          date : "24 September 2015"
 //     },
 //     {
 //          id : Math.round(Math.random() * 100 ).toString(),
 //          title : "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
 //          img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
 //          content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
 //                    + 
 //                    "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
 //                         +
 //                    "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
 //                    +
 //                    "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
 //                    +
 //                    "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
 //                    +
 //                    "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
 //                    +
 //                    "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
 //                    +
 //                    "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
 //                    +
 //                    "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
 //          author : "Start Bootstrap",
 //          date : "24 September 2015"
 //     },
 //     {
 //          id : Math.round(Math.random() * 100 ).toString(),
 //          title : "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
 //          img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
 //          content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
 //                    + 
 //                    "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
 //                         +
 //                    "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
 //                    +
 //                    "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
 //                    +
 //                    "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
 //                    +
 //                    "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
 //                    +
 //                    "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
 //                    +
 //                    "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
 //                    +
 //                    "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
 //          author : "Start Bootstrap",
 //          date : "24 September 2015"
 //     },
 //     {
 //          id : Math.round(Math.random() * 100 ).toString(),
 //          title : "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
 //          img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
 //          content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
 //                    + 
 //                    "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
 //                         +
 //                    "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
 //                    +
 //                    "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
 //                    +
 //                    "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
 //                    +
 //                    "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
 //                    +
 //                    "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
 //                    +
 //                    "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
 //                    +
 //                    "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
 //          author : "Start Bootstrap",
 //          date : "24 September 2015"
 //     }
 //     ];

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
                    $window.location.href = "/admin";
                    // (Tidak ada diterapkan konsep SPA antara Halaman User dan Admin Panel)
               }, 
               function(response){
                    $('#failed').modal('show');
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
     //articleDataPasser lihat di public/javascripts/bloguser-service.js, anggap seperti kelas statis yg global
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
                         // IMG sementara
                         "img" : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"] 
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
                    $('#failed').modal('show');
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
                    // $scope.akunsendiri = response.data.akunsendiri;
                    // $scope.added = response.data.add;
                    // $scope.not_friends = response.data.un_friend;
                    $scope.all = response.data.akunsendiri.concat(response.data.pertemanan, response.data.confirm, response.data.add, response.data.un_friend)
               }, 
               function(response){
                    //alert("Load failed! Try to refresh this page.");
                    $('#failed').modal('show');
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


     // // temporary, rencana nnt all loading dr event saja biar tidak memberatkan koneksi internet user.
     // $scope.unconfirmed = [{
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 0
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test2",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 0
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test3",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 0
     // }];


     // // temporary, rencana nnt all loading dr event saja biar tidak memberatkan koneksi internet user.
     // $scope.friends = [{
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test5",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test6",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test5",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test6",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test5",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test6",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test5",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test6",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test5",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test6",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test5",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test6",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // }];

     // temporary, rencana nnt all loading dr event saja biar tidak memberatkan koneksi internet user.
     // $scope.all = [
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 0,
     //      status_approve : 0
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test2",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 0
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test3",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 0,
     //      status_approve : 0
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test5",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 0
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 0,
     //      status_approve : 0
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 0
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 0,
     //      status_approve : 0
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 0
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 0,
     //      status_approve : 0
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 0
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 0,
     //      status_approve : 0
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 0
     // }
     // ];


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
                    $('#failed').modal('show');
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
                    $('#failed').modal('show');
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
                    $('#failed').modal('show');
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
                    $('#failed').modal('show');
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
                    $('#failed').modal('show');
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
                              // IMG sementara
                              "img" : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"] 
                         }
                    }
               }, 
               function(response){
                    //alert("Load failed! Try to refresh this page.");
                    $('#failed').modal('show');
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

     // $scope.userposts = [{
     //      // id : "id-posting(nomor)"
     //      // title : "judul",
     //      // img : ["link1", "link"],
     //      // content : "isi",
     //      // author : "penulis/user",
     //      // date : tanggal post;
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      title : "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
     //      img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
     //      content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
     //                + 
     //                "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
     //                     +
     //                "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
     //                +
     //                "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
     //                +
     //                "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
     //                +
     //                "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
     //      author : $scope.namauser,
     //      date : "24 September 2015"
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      title : "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
     //      img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
     //      content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
     //                + 
     //                "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
     //                     +
     //                "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
     //                +
     //                "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
     //                +
     //                "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
     //                +
     //                "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
     //      author : $scope.namauser,
     //      date : "24 September 2015"
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      title : "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
     //      img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
     //      content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
     //                + 
     //                "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
     //                     +
     //                "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
     //                +
     //                "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
     //                +
     //                "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
     //                +
     //                "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
     //      author : $scope.namauser,
     //      date : "24 September 2015"
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      title : "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
     //      img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
     //      content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
     //                + 
     //                "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
     //                     +
     //                "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
     //                +
     //                "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
     //                +
     //                "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
     //                +
     //                "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
     //      author : $scope.namauser,
     //      date : "24 September 2015"
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      title : "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
     //      img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
     //      content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
     //                + 
     //                "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
     //                     +
     //                "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
     //                +
     //                "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
     //                +
     //                "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
     //                +
     //                "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
     //      author : $scope.namauser,
     //      date : "24 September 2015"
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      title : "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
     //      img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
     //      content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
     //                + 
     //                "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
     //                     +
     //                "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
     //                +
     //                "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
     //                +
     //                "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
     //                +
     //                "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
     //      author : $scope.namauser,
     //      date : "24 September 2015"
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      title : "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
     //      img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
     //      content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
     //                + 
     //                "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
     //                     +
     //                "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
     //                +
     //                "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
     //                +
     //                "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
     //                +
     //                "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
     //      author : $scope.namauser,
     //      date : "24 September 2015"
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      title : "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
     //      img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
     //      content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
     //                + 
     //                "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
     //                     +
     //                "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
     //                +
     //                "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
     //                +
     //                "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
     //                +
     //                "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
     //      author : $scope.namauser,
     //      date : "24 September 2015"
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      title : "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
     //      img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
     //      content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
     //                + 
     //                "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
     //                     +
     //                "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
     //                +
     //                "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
     //                +
     //                "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
     //                +
     //                "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
     //      author : $scope.namauser,
     //      date : "24 September 2015"
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      title : "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
     //      img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
     //      content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
     //                + 
     //                "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
     //                     +
     //                "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
     //                +
     //                "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
     //                +
     //                "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
     //                +
     //                "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
     //      author : $scope.namauser,
     //      date : "24 September 2015"
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      title : "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
     //      img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
     //      content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
     //                + 
     //                "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
     //                     +
     //                "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
     //                +
     //                "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
     //                +
     //                "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
     //                +
     //                "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
     //      author : $scope.namauser,
     //      date : "24 September 2015"
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      title : "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
     //      img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
     //      content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
     //                + 
     //                "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
     //                     +
     //                "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
     //                +
     //                "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
     //                +
     //                "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
     //                +
     //                "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
     //      author : $scope.namauser,
     //      date : "24 September 2015"
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      title : "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
     //      img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
     //      content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
     //                + 
     //                "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
     //                     +
     //                "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
     //                +
     //                "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
     //                +
     //                "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
     //                +
     //                "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
     //      author : $scope.namauser,
     //      date : "24 September 2015"
     // }
     // ];

     // temporary, rencana nnt all loading dr event saja biar tidak memberatkan koneksi internet user.
     // $scope.friends = [
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test2",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test3",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test5",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // }
     // ];

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
                    $('#failed').modal('show');
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
                    $('#failed').modal('show');
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
                    $('#failed').modal('show');
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
                    $('#failed').modal('show');
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
                    $('#failed').modal('show');
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
          $("#btnSubmit").text('');
          $("#btnSubmit").val('Save Changes');
          $("#btnSubmit").text('Save Changes');
          $('#btnSubmit').removeClass('disabled'); // Enable visually
          $('#btnSubmit').prop('disabled', false); // Enable visually + functionally
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
                              // IMG sementara
                              "img" : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"] 
                         }
                    }
                    $window.document.title = $scope.namateman;
               }, 
               function(response){
                    //alert("Load failed! Try to refresh this page.");
                    $('#failed').modal('show');
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
     // $scope.namateman = "Temantest";
     // $scope.fotoprofilteman = "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm";
     // $scope.fotokronologiteman = "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm";
     // $scope.posts = [{
     //      // id : "id-posting(nomor)"
     //      // title : "judul",
     //      // img : ["link1", "link"],
     //      // content : "isi",
     //      // author : "penulis/user",
     //      // date : tanggal post;
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      title : "AI believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
     //      img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
     //      content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
     //                + 
     //                "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
     //                     +
     //                "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
     //                +
     //                "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
     //                +
     //                "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
     //                +
     //                "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
     //      author : $scope.namateman,
     //      date : "24 September 2015"
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      title : "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
     //      img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
     //      content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
     //                + 
     //                "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
     //                     +
     //                "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
     //                +
     //                "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
     //                +
     //                "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
     //                +
     //                "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
     //      author : $scope.namateman,
     //      date : "24 September 2015"
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      title : "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
     //      img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
     //      content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
     //                + 
     //                "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
     //                     +
     //                "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
     //                +
     //                "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
     //                +
     //                "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
     //                +
     //                "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
     //      author :  $scope.namateman,
     //      date : "24 September 2015"
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      title : "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
     //      img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
     //      content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
     //                + 
     //                "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
     //                     +
     //                "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
     //                +
     //                "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
     //                +
     //                "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
     //                +
     //                "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
     //      author :  $scope.namateman,
     //      date : "24 September 2015"
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      title : "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
     //      img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
     //      content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
     //                + 
     //                "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
     //                     +
     //                "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
     //                +
     //                "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
     //                +
     //                "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
     //                +
     //                "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
     //      author :  $scope.namateman,
     //      date : "24 September 2015"
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      title : "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
     //      img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
     //      content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
     //                + 
     //                "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
     //                     +
     //                "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
     //                +
     //                "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
     //                +
     //                "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
     //                +
     //                "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
     //      author :  $scope.namateman,
     //      date : "24 September 2015"
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      title : "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
     //      img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
     //      content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
     //                + 
     //                "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
     //                     +
     //                "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
     //                +
     //                "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
     //                +
     //                "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
     //                +
     //                "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
     //      author :  $scope.namateman,
     //      date : "24 September 2015"
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      title : "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
     //      img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
     //      content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
     //                + 
     //                "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
     //                     +
     //                "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
     //                +
     //                "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
     //                +
     //                "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
     //                +
     //                "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
     //      author :  $scope.namateman,
     //      date : "24 September 2015"
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      title : "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
     //      img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
     //      content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
     //                + 
     //                "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
     //                     +
     //                "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
     //                +
     //                "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
     //                +
     //                "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
     //                +
     //                "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
     //      author :  $scope.namateman,
     //      date : "24 September 2015"
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      title : "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
     //      img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
     //      content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
     //                + 
     //                "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
     //                     +
     //                "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
     //                +
     //                "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
     //                +
     //                "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
     //                +
     //                "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
     //      author : $scope.namateman,
     //      date : "24 September 2015"
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      title : "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
     //      img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
     //      content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
     //                + 
     //                "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
     //                     +
     //                "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
     //                +
     //                "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
     //                +
     //                "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
     //                +
     //                "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
     //      author :  $scope.namateman,
     //      date : "24 September 2015"
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      title : "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
     //      img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
     //      content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
     //                + 
     //                "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
     //                     +
     //                "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
     //                +
     //                "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
     //                +
     //                "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
     //                +
     //                "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
     //      author :  $scope.namateman,
     //      date : "24 September 2015"
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      title : "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
     //      img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
     //      content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
     //                + 
     //                "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
     //                     +
     //                "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
     //                +
     //                "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
     //                +
     //                "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
     //                +
     //                "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
     //                +
     //                "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
     //      author :  $scope.namateman,
     //      date : "24 September 2015"
     // }
     // ];

     // temporary, rencana nnt all loading dr event saja biar tidak memberatkan koneksi internet user.
     // $scope.friends = [
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 0,
     //      status_approve : 0
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test2",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 0
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test3",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 0,
     //      status_approve : 0
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test5",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 0
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 0,
     //      status_approve : 0
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 0
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 0,
     //      status_approve : 0
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 0
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 0,
     //      status_approve : 0
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 0
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 1
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 0,
     //      status_approve : 0
     // },
     // {
     //      id : Math.round(Math.random() * 100 ).toString(),
     //      nama : "test4",
     //      fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      fotokronologi : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
     //      status_add : 1,
     //      status_approve : 0
     // }
     // ];

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
                    $('#failed').modal('show');
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
                    $('#failed').modal('show');
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
                    $('#failed').modal('show');
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
                    $('#failed').modal('show');
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
                    $('#failed').modal('show');
               }
          );
     };
}]);

app.controller('postCtrl', ['articleDataPasser', '$scope', '$timeout', '$http', '$route', function(articleDataPasser, $scope, $timeout, $http, $route) {
     $scope.currentPost = {
          id : null,
          title : "",
          // img : [""], //--> Tidak dipakai dulu sementara karena belum ditemukan cara upload image.
          body : "",
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
                         $('#failed').modal('show');
                   }
               );
     }

     // Load kategori
     $scope.loadCategories();

     // watch (secara realtime) untuk cek kembalian dari fungsi getPostButtonText
     $scope.$watch("getPostButtonText()", function(newVal, oldVal) {
          // cek perubahan nilai
          if (newVal == "Save Changes" && oldVal == "Post") {
               $scope.tempPost = articleDataPasser.loadArticle();
               $scope.currentPost = {
                    id : $scope.tempPost.id,
                    title : $scope.tempPost.title,
                    // img : [""], //--> Tidak dipakai dulu sementara karena belum ditemukan cara upload image.
                    body : $scope.tempPost.content,
                    kategori_id : $scope.tempPost.id_kategori
               }
          }
     },true);


     $scope.initNewPostModal = function(){
          if($("#newPostLabel").text() == "Edit Post"){
               $scope.resetInput(); 
          }

          $("#newPostLabel").text("Buat Post Baru"); 
          $("#btnSubmit").text('');
          $("#btnSubmit").val('Post');
          $("#btnSubmit").text('Post'); 
          $('#btnSubmit').addClass('disabled'); // Disables visually
          $('#btnSubmit').prop('disabled', true); // Disables visually + functionally
          $("#btnClear").removeClass('hidden');

     }
     $scope.submitPost = function(){
          $('#newPost').modal('hide');
          if($scope.getPostButtonText() == "Post"){
               // Insert ke DB, karena id gak ada (Post baru), pakai increment saja.
               $http.post("/post", $.param(
                    { 
                         key : $scope.storage.key,
                         title : $scope.currentPost.title, 
                         body : $scope.currentPost.body, 
                         kategori_id : $scope.currentPost.kategori_id
                    }), 
                    $scope.config)
                    .then(
                         function(response){
                              // Jika post berhasil disubmit maka tampilkan
                              $('#success').modal('show');
                         }, 
                         function(response){
                              //alert("Post failed! Check your internet connection.");
                              $('#failed').modal('show');
                         }
                    );     

          }
          else if ($scope.getPostButtonText() == "Save Changes"){
               // Update ke DB dengan berdasarkan id yang ada
               $http.post("/post/update", $.param(
                    { 
                         key : $scope.storage.key,
                         id : $scope.currentPost.id,
                         title : $scope.currentPost.title, 
                         body : $scope.currentPost.body, 
                         kategori_id : $scope.currentPost.kategori_id
                         //img?

                    }), 
                    $scope.config)
                    .then(
                         function(response){
                              // Jika post berhasil di-edit maka tampilkan
                              $('#success2').modal('show');
                         }, 
                         function(response){
                              //alert("Edit failed! Check your internet connection.");
                              $('#failed').modal('show');
                         }
                    ); 
          }
          $scope.resetInput();
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
                    $('#success3').modal('show');
               }, 
               function(response){
                    //alert("Delete failed! Check your internet connection.");
                    $('#failed').modal('show');
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
               resize: 'vertical',
               height: '240px',
               setup : function(ed) {
                  ed.on('keyup', function() {
                    // Cukup naive karena kebetulan editor yang ada hanya 1
                     $scope.currentPost.body = tinyMCE.activeEditor.getContent();
                     $scope.cekValiditas();
                  });
               }
     };
}]);