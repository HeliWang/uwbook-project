'use strict';
app.controller('homeController', ['$scope', '$log', '$http', '$routeParams', function ($scope, $log, $http, $routeParams) {
    console.log("Home Controller");

    var APIserver = "/";

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


    $http.get(APIserver + "api/Books").success(function (response) {
        $scope.books = response;
        $log.info(response);
    });

    /* $scope.books = [
      {
          Name: "Calculus: Early Transcendentals 1E",
          ISBN: "1594633940",
          Author: "Marlon James",
          CoverURL: "http://i.ebayimg.com/00/s/NDAwWDI2NA==/z/hi0AAOSw-ndTndXU/$_7.JPG?set_id=89040003C1",
          Subjects: [   {
      "SubjectID": 1,
      "SubjectName": "sample string 2"
    },],
          Sellers: [{ Price: 32.5, Post: "20151028 10:41:52",  Note: "Never used, My phone number 2269787328" , Contact: "h379wang@uwaterloo.ca", Hot: 2 },
                    { Price: 16.8, Post: "20151028 10:41:53", Note: "Used, My phone number 2269787328", Contact: "h379wang@uwaterloo.ca", Hot:3 }]
      },
            {
                Name: "Calculus: Early Transcendentals 2E",
                ISBN: "1594633940",
                Author: "Marlon James",
                CoverURL: "http://i.ebayimg.com/00/s/NDAwWDI2NA==/z/hi0AAOSw-ndTndXU/$_7.JPG?set_id=89040003C1",
                Subjects: ["CS245"],
                Sellers: [{ Price: 32.5, Post: "20151028 10:41:52", Note: "Never used, My phone number 2269787328", Contact: "h379wang@uwaterloo.ca", Hot: 2 },
                          { Price: 16.8, Post: "20151028 10:41:53", Note: "Used, My phone number 2269787328", Contact: "h379wang@uwaterloo.ca", Hot: 3 }]
            }
    ]; */


    $scope.pageChangeHandler = function (num) {
        console.log('going to page ' + num);
    };

    $scope.bookDetail = function (obj) {
        $scope.currentbook = obj;
       
        $('#detailModal').modal('show');
    };

    var myDate = new Date;
    

    $scope.addSeller = function () {
        var req = {
            method: 'PUT',
            url: 'api/Books/' + $scope.currentbook.ID,
            headers: {
                'Content-Type': 'application/json'
            },
            data: { 
                Price: $scope.newPrice,
                Note:  $scope.newNote,
                Contact: user,
                Post: myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate() + " " +
myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds(),
                Hot: 0
            }
        }

        $http(req).then(function () {
            $http.get(APIserver + "api/Books").success(function (response) {
                $scope.books = response;
                for (var index = 0; index < $scope.books.length; ++index) {
                    if ($scope.books[index].ID == $scope.currentbook.ID) $scope.currentbook = $scope.books[index]
                }
                $log.info(response);
            });
            $scope.newPrice = undefined;
            $scope.newNote = undefined;
           
        }, function () { });
    };

    $scope.addHot = function (sellerid) {
        console.log("seller" + sellerid);
        
        $http.get(APIserver + "api/Sellers/" + sellerid).success(function (response) {
            $http.get(APIserver + "api/Books").success(function (response) {
                $scope.books = response;
                for (var index = 0; index < $scope.books.length; ++index) {
                    if ($scope.books[index].ID == $scope.currentbook.ID) $scope.currentbook = $scope.books[index]
                }
                $log.info(response);
            });
        });

    }

    $scope.deleteSeller = function (sellerid) {
        console.log("seller" + sellerid);

        var req = {
            method: 'Delete',
            url: APIserver + "api/Sellers/" + sellerid,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {}
        }

        $http(req).success(function (response) {
            $http.get(APIserver + "api/Books").success(function (response) {
                $scope.books = response;
                for (var index = 0; index < $scope.books.length; ++index) {
                    if ($scope.books[index].ID == $scope.currentbook.ID) $scope.currentbook = $scope.books[index]
                }
                $log.info(response);
            });
        });

    }

    $scope.addBook = function () {

        var req = {
            method: 'POST',
            url: 'api/Books/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: 
                {
                    "Name": $scope.newName,
                    "ISBN": $scope.newISBN,
                    "Author": $scope.newAuthor,
                    "CoverURL": $scope.newCover,
                    "Subjects": [
                      {
                          "SubjectName": $scope.newSubject
                      }
                    ],
                    "Sellers": []
                }
            }
        

        console.log(req);

        $http(req).then(function () {
            $('#addModal').modal('hide');
            $http.get(APIserver + "api/Books").success(function (response) {
                $scope.books = response;
                $log.info(response);
            });
            $scope.newISBN = undefined;
            $scope.newName = undefined;
            $scope.newAuthor = undefined;
            $scope.newCover = undefined;
            $scope.newSubject = undefined;
            console.log("succeed"); 
        }, function () { console.log("fail");  });
    };



}]);



