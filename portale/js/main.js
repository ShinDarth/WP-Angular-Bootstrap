(function () {
  var app = angular.module('portale', ['ui.bootstrap', 'ngRoute', 'ngSanitize']);

  // indirizzo di wordpress con wp-json plugin
  var wp = "/wordpress/wp-json/";

  // routing
  app.config(function($routeProvider) {

    $routeProvider
    .when('/post/:id', {
      controller: 'PostController',
      templateUrl: "partials/post.html"
    })
    .when('/category/:id', {
      controller: 'CategoryController',
      templateUrl: "partials/category.html"
    })
    .otherwise({
      controller: 'Home',
      templateUrl: "partials/home.html"
    });
  });

  app.controller("PostController", function($scope, $routeParams, $http) {
    $http.get( wp + "posts/" + $routeParams.id )
    .success(function(data, status, header, config) {
      $scope.post = data;
    })
    .error(function(data, status, header, config) {
      console.log("Error in $http.get() of RouteController");
    });
  });

  app.controller("CategoryController", function($scope, $routeParams, $http) {
    $http.get( wp + "posts?filter[cat]=" + $routeParams.id )
    .success(function(data, status, header, config) {
      $scope.posts = data;
    })
    .error(function(data, status, header, config) {
      console.log("Error in $http.get() of RouteController");
    });
  });

  app.controller("MenuController", function($scope, $http) {
    $http.get( wp + "posts/types/posts/taxonomies/category/terms" )
    .success(function(data, status, header, config) {
      $scope.categories = data;
    })
    .error(function(data, status, header, config) {
      console.log("Error in $http.get() of MenuController (categories)");
    });

    $http.get( wp + "pages" )
    .success(function(data, status, header, config) {
      $scope.pages = data;
    })
    .error(function(data, status, header, config) {
      console.log("Error in $http.get() of MenuController (pages)");
    });
  });

})()
