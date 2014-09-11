'use strict';

/**
 * @ngdoc function
 * @name schedulerApp.controller:TasksCtrl
 * @description
 * # TasksCtrl
 * Controller of the schedulerApp
 */

angular.module('schedulerApp')
  .controller('TasksCtrl', function ($scope, taskAPI) {
    $scope.tasks = taskAPI.get_index();

    $scope.$on('refresh-tasks', function(event){
        $scope.tasks = taskAPI.get_index();
    })
  });




/*
Template
{
    "title":,
    "memo":,
    "deadline":{
        "year": ,
        "month": ,
        "day":
    },
    "workload":{
        "hour":,
        "minute":
    },
    "spent_time":{
        "hour":,
        "minute":
    },
    "complete":
}

*/
