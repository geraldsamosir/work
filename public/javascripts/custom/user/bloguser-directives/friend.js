app.directive('friendsList', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=' 
    },

    templateUrl: '/javascripts/custom/user/bloguser-directives/friends-list.html',
  }; 
});