'use strict';

/**
 * @ngdoc function
 * @name schedulerApp.controller:DemoCtrl
 * @description
 * # DemoCtrl
 * Controller of the schedulerApp
 */
angular.module('schedulerApp')
  .controller('DemoCtrl', function ($scope, $http, $localStorage) {
    $scope.deathCase = {};
    $scope.manyTasksCase = {};
    $scope.myCase = {};

    $http.get('/dummyDB/death_case.json')
        .then(function(data, status, headers, config){
            $scope.deathCase.data = data.data;
            $scope.deathCase.active = true;
        });
    $http.get('/dummyDB/many_tasks_case.json')
        .then(function(data, status, headers, config){
            $scope.manyTasksCase.data = data.data
            $scope.manyTasksCase.active = true;
        });
    $http.get('/dummyDB/my_case.json')
       .then(function(data, status, headers, config){
            $scope.myCase.data = data.data;
            $scope.myCase.active = true;
        });
    $scope.deathCase.apply = function(){
        $localStorage.$reset();
        $localStorage.tasks = $scope.deathCase.data;
        console.log($localStorage.tasks)
    }
    $scope.manyTasksCase.apply = function(){
        $localStorage.$reset();
        $localStorage.tasks = $scope.manyTasksCase.data;
    }
    $scope.myCase.apply = function(){
        $localStorage.$reset();
        $localStorage.tasks = $scope.myCase.data;
    }

    $scope.reset = function(){
        $localStorage.$reset()
        $localStorage.tasks = [];
    }
  });
