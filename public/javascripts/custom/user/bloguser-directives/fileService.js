// Pengembalian data dalam bentuh array, jd hati-hati.
app.directive('file', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.file);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files);
                });
            });
        }
    };
}]);