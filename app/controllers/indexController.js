'use strict';
app.controller('indexController', ['$scope', '$location', function ($scope, $location) {
    $scope.go = function (path) {
        $location.path(path);
    };
    console.log("INDEX");

    $scope.authentication = {
    };

}]);