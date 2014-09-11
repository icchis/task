'use strict';

/**
 * @ngdoc function
 * @name schedulerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the schedulerApp
 */

angular.module('schedulerApp')
  .controller('MainCtrl', function ($scope, taskAPI, scheduler) {

    function refresh(){
        var tasks = taskAPI.get_index();
        var scheduledTasks = scheduler.main(tasks, 180, 4, []);
        console.log(scheduledTasks)

        $scope.priority_tasks = scheduledTasks.priority_tasks;

        function timeApply(element, index, array) {
            console.log(element)
            element.time = element.rest;
        }

        scheduledTasks.short_tasks.forEach(timeApply);

        $scope.short_tasks = scheduledTasks.short_tasks;

    }

    $scope.$on('start-timer', function(event, exclusiveId){
        event.stopPropagation();

        $scope.$broadcast('pause-timer',exclusiveId);
    })

    $scope.$on('refresh-tasks', function(event){
        refresh();
    })

    refresh();

    $scope.detailclick = function(){
        $('.task_list dd').slideUp("fast");
        if($(event.target).next( ".s_hide" ).next( "dd" ).css('display') == 'none'){
            $(event.target).next( ".s_hide" ).next( "dd" ).slideDown("fast");
        }
    }
    // $scope.showActions = function(){
    //     $(".task_list dt").css('color', '#333');
    //     $(".s_hide").fadeOut('fast');
    //     if($(event.target).next( ".s_hide" ).css('display') == 'none'){
    //         $(event.target).css('color', '#F33');
    //         $(event.target).next(".s_hide").fadeIn('fast');
    //     }
    // }
    // $scope.hideActions = function(){
    //     $(".task_list dt").css('color', '#333');
    //     $(event.target).fadeOut('fast');
    // }
    // $scope.top_delete = function(){
    //     $(event.target).fadeOut('fast');
    //     $(event.target).parent(".s_hide").parent("dl").fadeOut('fast');
    // }


  });
