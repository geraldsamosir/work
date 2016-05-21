app.directive('allPostPreview', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=' 
    }, 
    templateUrl: '/javascripts/angular/bloguser-directives/all-post-preview.html' 
  }; 
});

app.directive('userPostPreview', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=' 
    }, 
    templateUrl: '/javascripts/angular/bloguser-directives/user-post-preview.html' 
  }; 
});

app.directive('friendPostPreview', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=' 
    }, 
    templateUrl: '/javascripts/angular/bloguser-directives/friend-post-preview.html' 
  }; 
});