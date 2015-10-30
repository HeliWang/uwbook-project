
var app = angular.module('UWBOOK', ['ngRoute', 'angularUtils.directives.dirPagination']);

app.config(function ($routeProvider) {

    $routeProvider.when("/home", {
        controller: "homeController",
        templateUrl: "/app/views/home.html"
    });
    $routeProvider.otherwise({ redirectTo: "/home" });

});

