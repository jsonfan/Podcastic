var myApp = angular.module('myApp', ['ngRoute'])
  .config(function($routeProvider){
    $routeProvider
    .when('/', {
      templateUrl: '/partials/main.html', controller: 'mainController'
    })
    .otherwise({
      redirectTo:'/'
    });
  })
