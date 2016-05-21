app.directive('friendsList', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=' 
    },

    templateUrl: '/javascripts/angular/bloguser-directives/friends-list.html',
  }; 
});