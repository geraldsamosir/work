app.controller('bloguserCtrl', ['$scope', '$timeout' , function($scope, $timeout) {
	$scope.posts = [{
		// id : "id-posting(nomor)"
		// title : "judul",
		// img : ["link1", "link"],
		// content : "isi",
		// author : "penulis/user",
		// date : tanggal post;
		id : Math.round(Math.random() * 100 ).toString(),
		title : "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
		img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
		content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
                    + 
                    "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
					+
                    "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
                    +
                    "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
                    +
                    "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
                    +
                    "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
                    +
                    "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
                    +
                    "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
                    +
                    "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
		author : "Start Bootstrap",
		date : "24 September 2015"
	},
	{
		id : Math.round(Math.random() * 100 ).toString(),
		title : "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
		img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
		content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
                    + 
                    "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
					+
                    "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
                    +
                    "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
                    +
                    "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
                    +
                    "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
                    +
                    "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
                    +
                    "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
                    +
                    "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
		author : "Start Bootstrap",
		date : "24 September 2015"
	},
	{
		id : Math.round(Math.random() * 100 ).toString(),
		title : "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
		img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
		content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
                    + 
                    "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
					+
                    "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
                    +
                    "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
                    +
                    "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
                    +
                    "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
                    +
                    "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
                    +
                    "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
                    +
                    "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
		author : "Start Bootstrap",
		date : "24 September 2015"
	},
	{
		id : Math.round(Math.random() * 100 ).toString(),
		title : "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
		img : ["https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg", "https://raw.githubusercontent.com/geraldsamosir/startbootstrap-clean-blog/gh-pages/img/post-sample-image.jpg"],
		content : "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
                    + 
                    "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>"
					+
                    "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>"
                    +
                    "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>"
                    +
                    "<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>"
                    +
                    "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
                    +
                    "<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>"
                    +
                    "<blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>"
                    +
                    "<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>",
		author : "Start Bootstrap",
		date : "24 September 2015"
	}];
}]);

app.controller('friendsCtrl', ['$scope', '$timeout' , function($scope, $timeout) {
     // diatasnya set inisialisasi load DB dari teman yg belom di confirm dan sudah di confirm.


     // temporary, rencana nnt all loading dr event saja biar tidak memberatkan koneksi internet user.
     $scope.unconfirmed = [{
          nama : "test",
          fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
          fotokronologi : ["https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm", "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm"]
     },
     {
          nama : "test2",
          fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
          fotokronologi : ["https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm", "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm"]
     },
     {
          nama : "test3",
          fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
          fotokronologi : ["https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm", "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm"]
     }];


     // temporary, rencana nnt all loading dr event saja biar tidak memberatkan koneksi internet user.
     $scope.confirmed = [{
          nama : "test4",
          fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
          fotokronologi : ["https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm", "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm"]
     },
     {
          nama : "test5",
          fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
          fotokronologi : ["https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm", "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm"]
     },
     {
          nama : "test6",
          fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
          fotokronologi : ["https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm", "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm"]
     }];

     // temporary, rencana nnt all loading dr event saja biar tidak memberatkan koneksi internet user.
     $scope.all = [
     {
          nama : "test",
          fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
          fotokronologi : ["https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm", "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm"],
          status_add : 0,
          status_approve : 0
     },
     {
          nama : "test2",
          fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
          fotokronologi : ["https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm", "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm"],
          status_add : 1,
          status_approve : 0
     },
     {
          nama : "test3",
          fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
          fotokronologi : ["https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm", "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm"],
          status_add : 1,
          status_approve : 1
     },
     {
          nama : "test4",
          fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
          fotokronologi : ["https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm", "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm"],
          status_add : 0,
          status_approve : 0
     },
     {
          nama : "test5",
          fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
          fotokronologi : ["https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm", "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm"],
          status_add : 1,
          status_approve : 0
     },
     {
          nama : "test6",
          fotoprofil : "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm",
          fotokronologi : ["https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm", "https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm"],
          status_add : 1,
          status_approve : 1
     }];


     $scope.requestFriend = function(){
          alert('Requested');
     };
     $scope.cancelrequestFriend = function(){
          alert('Cancelled Request');
     };
     $scope.accept = function(){
          alert('Accept');
     };
     $scope.reject = function(){
          alert('Reject');
     };
     $scope.delete = function(){
          alert('Delete');
     };

     $scope.clsmenu1 = "active";
     $scope.clsisimenu1 = "";
     $scope.clsmenu2 = "";
     $scope.clsisimenu2 = "hidden";
     $scope.clsmenu3 = "";
     $scope.clsisimenu3 = "hidden";

     $scope.switchtab = function(i){
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

     $scope.searchKeyword = "";
     $scope.search = function(temp){
          $scope.searchKeyword = temp;
     }
}]);