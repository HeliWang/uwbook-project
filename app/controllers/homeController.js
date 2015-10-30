'use strict';
app.controller('homeController', ['$scope', '$log', '$routeParams', function ($scope, $log, $routeParams) {
    console.log("Home Controller");

   
    var user = $routeParams.user;
    $log.info('SomeCtrl home! user: ' + user + "Type: "+typeof user);
    if (typeof user != 'undefined' && user != "") $scope.authentication.userName = user; // localhost:32150/main.html#/home?user=moby&search=cs245

    var search = $routeParams.search;
    $log.info('SomeCtrl home! search: ' + search + "Type: " + typeof search);
    if (typeof search != 'undefined' && search != "") {
        $scope.q = search;
        document.getElementById("search").value = search;
    } else {
        $scope.q = "";
        document.getElementById("search").value = "";
    }

    $scope.currentPage = 1;
    $scope.pageSize = 8;
    $scope.books = [
      {
          Name: "Calculus: Early Transcendentals 1E",
          ISBN: "1594633940",
          Author: "Marlon James",
          CoverURL: "http://i.ebayimg.com/00/s/NDAwWDI2NA==/z/hi0AAOSw-ndTndXU/$_7.JPG?set_id=89040003C1",
          Subjects: ["CS245"],
          Sellers: [{ Price: 32.5, Post: "20151028 10:41:52",  Note: "Never used, My phone number 2269787328" , Contact: "h379wang@uwaterloo.ca", Hot: 2 },
                    { Price: 16.8, Post: "20151028 10:41:53", Note: "Used, My phone number 2269787328", Contact: "h379wang@uwaterloo.ca", Hot:3 }]
      }
    ];


    $scope.pageChangeHandler = function (num) {
        console.log('going to page ' + num);
    };

    $scope.bookDetail = function (obj) {
        $scope.currentbook = obj;
        console.log($scope.currentbook);
        $('#detailModal').modal('show')
    };


}]);



