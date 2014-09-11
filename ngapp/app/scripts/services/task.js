  'use strict';

/**
 * @ngdoc service
 * @name schedulerApp.task
 * @description
 * # task
 * Factory in the schedulerApp.
 */
angular.module('schedulerApp')
  .factory('taskAPI', function ($http,$localStorage) {
    var $strg = $localStorage;
    if(!$strg.tasks){
      $strg.tasks = [];
    }
    return {
      get: function(id){
        return angular.copy($strg.tasks[id]);
      },
      get_index: function(){
        return angular.copy($strg.tasks);
      },
      push: function(taskArg){
        var tasks = $strg.tasks;
        console.log(taskArg)
        var task = angular.copy(taskArg);
        task.complete = false;
        task.spent_time = 0;
        task.todaysWork = 0;
        tasks.push(task);
        tasks[tasks.length-1].id = tasks.length-1;
        return tasks.length;
      },
      patch: function(id,todaysWork){
        console.log('patch')
        console.log($strg.tasks[id])
        $strg.tasks[id].todaysWork = todaysWork;
      },
      complete: function(id){
        console.log('done');
        $strg.tasks[id].complete = true;
      }
    };
  });
