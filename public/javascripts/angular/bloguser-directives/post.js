var app = angular.module('bloguser'); // memakai blog user dr controller, krn itu tidak ada parameter kedua.

app.directive('postPreview', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=' 
    }, 
    templateUrl: '/javascripts/angular/bloguser-directives/post-preview.html' 
  }; 
});