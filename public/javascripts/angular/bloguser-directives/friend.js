app.directive('friendsList', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=' 
    },

    templateUrl: '/javascripts/angular/bloguser-directives/friends-list.html',
  }; 
});

app.directive('unconfirmedFriendsList', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=' 
    }, 
    templateUrl: '/javascripts/angular/bloguser-directives/unconfirmed-friends-list.html' 
  }; 
});