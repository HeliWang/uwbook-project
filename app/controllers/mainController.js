'use strict';
app.controller('mainController', ['$scope', '$location', function ($scope, $location) {
    $scope.go = function (path) {
        $location.path(path);
    };
    console.log("mainController");

    $scope.authentication = {
    };

}]);