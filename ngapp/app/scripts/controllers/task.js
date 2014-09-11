'use strict';

/**
 * @ngdoc function
 * @name schedulerApp.controller:TaskCtrl
 * @description
 * # TaskCtrl
 * Controller of the schedulerApp
 */
angular.module('schedulerApp')
  .controller('TaskCtrl', function ($scope, $timeout, taskAPI) {
    $scope.task.restDays = function(){
            var deadline = new Date(this.deadline);
            var today = new Date;

            var msDiff = deadline.getTime() - today.getTime();
            var daysDiff = Math.floor(msDiff / (1000 * 60 * 60 *24));

            return ++ daysDiff;
        }

    var count = 0;
    $scope.trashclick = function(){
        count ++;
        $(event.target).parent().parent().removeClass('close');
        $(event.target).parent().parent().addClass('open');
        $(event.target).parent().addClass('opentrash');

        $(".opentrash").click(function(){
            if($('.to_trash').hasClass('opentrash')) {
                $(event.target).parent().parent().addClass('reach_trash');
                $(".reach_trash").addClass( "hinge");
                $timeout(flagComplete,2000);
            }
        });

        function flagComplete(){
            $scope.task.complete = true;
            taskAPI.complete($scope.task.id);
            // $(".to_trash").css("display", "none");
            $(event.target).parent().parent().next().addClass('.task_list');
        }
    }
  });
