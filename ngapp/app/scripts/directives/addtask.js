'use strict';

/**
 * @ngdoc directive
 * @name schedulerApp.directive:addTask
 * @description
 * # addTask
 */
angular.module('schedulerApp')
  .directive('addTask', function () {
    return {
      templateUrl: '/templates/addTask.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      },
      transclude: true,
      controller: function ($scope, taskAPI) {

          function resetForm(){
            if(! $scope.task){
              $scope.task = {};
            }
            $scope.task.name = null;
            $scope.task.rest_time = 0;
            $scope.task.memo = null;
            $scope.input = {
              hours:0,
              minutes:0
            };


            var today = new Date();
            var yyyy = today.getFullYear();
            var mm   = today.getMonth() + 1;
            var dd  = today.getDate();
            mm = (mm < 10) ? "0" + mm : mm;
            dd = (dd < 10) ? "0" + dd : dd;

            $scope.task.deadline = yyyy + '-' + mm + '-' + dd;

          }

          resetForm();

          $scope.pushTask = function(task){
            task.rest_time = $scope.input.hours * 60 + $scope.input.minutes;
            console.log(task.rest_time)
            taskAPI.push(task);
            $scope.$broadcast('refresh-tasks')
            resetForm()
          }
      }
    };
  });
