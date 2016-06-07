app.directive('allPostPreview', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=' 
    }, 
    templateUrl: '/javascripts/custom/user/bloguser-directives/all-post-preview.html' 
  }; 
});

app.directive('userPostPreview', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=' 
    }, 
    templateUrl: '/javascripts/custom/user/bloguser-directives/user-post-preview.html' 
  }; 
});

app.directive('friendPostPreview', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=' 
    }, 
    templateUrl: '/javascripts/custom/user/bloguser-directives/friend-post-preview.html' 
  }; 
});