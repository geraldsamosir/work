app.directive('postPreview', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=' 
    }, 
    templateUrl: '/javascripts/angular/bloguser-directives/post-preview.html' 
  }; 
});