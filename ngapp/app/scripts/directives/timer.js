'use strict';

/**
 * @ngdoc directive
 * @name schedulerApp.directive:timer
 * @description
 * # timer
 */
angular.module('schedulerApp')
  .directive('timer', function () {

    return {
      templateUrl: '/templates/timer.html',
      restrict: 'E',
      scope:{
        task:'=',
        exId:'='
      },
      controller: function ($scope, $interval, $element, taskAPI) {

        var task = $scope.task;

        function Timer(id){
          var self = this;
          self.timerId;
          self.startDate;
          self.hours = '00';
          self.minutes = '00';
          self.seconds = '00';
          self.exclusiveId = id;
          self.negative = false;
          self.active   = false;

          self.init = function(){
            var duration = task.time * 60 * 1000 - task.todaysWork * 60 - 1000;

            self.parse(duration)
          }

          self.start = function(){
            $element.addClass('active');
            self.active = true;
            self.startDate = new Date();
            self.startDate = self.startDate.setMilliseconds(self.startDate.getMilliseconds() + 1000)
            console.log(self.startDate);
            var defaultTime = task.todaysWork;
            console.log('defaultTime', defaultTime)
            self.startDate -= defaultTime * 1000;
            console.log('startDate', self.startDate)

            self.timerId = $interval(self.quron,1000);
            $scope.$emit('start-timer',this.exclusiveId)
          }
          self.absSeconds = function(){
            var duration = self.duration();
            console.log(duration)
            return parseInt(duration/1000);
          }
          self.pause = function(){
            self.active = false;
            console.log('todaysWork',task.todaysWork)
            console.log('absSecond()',self.absSeconds())
            task.todaysWork = task.time * 60 - self.absSeconds();
            console.log('todaysWork', task.todaysWork)
            taskAPI.patch(task.id, task.todaysWork );
            $interval.cancel(self.timerId);
            $element.removeClass('active');
          }
          self.duration = function(){
            // How much time passed from start time
            // milliseconds
            var now = new Date()
            console.log(task.time);
            console.log(self.startDate)
            // return now - self.startDate;
            var duration = self.startDate - now + task.time * 60 * 1000;

            return duration;
          }
          self.quron = function(){
            var duration = self.duration();
            console.log('duration',duration)
            self.parse(duration)
          }
          self.parse = function(duration){
            if(duration < 0){
              self.negative = true;
              duration = -1 * duration;
              $element.addClass('negative')
            }
            var milliseconds = parseInt((duration%1000)/100)
                , seconds    = parseInt((duration/1000)%60)
                , minutes    = parseInt((duration/(1000*60))%60)
                , hours      = parseInt(duration/(1000*60*60));

            self.hours   = (hours < 10) ? "0" + hours : hours;
            self.minutes = (minutes < 10) ? "0" + minutes : minutes;
            self.seconds = (seconds < 10) ? "0" + seconds : seconds;
          }
          self.toggle = function(){
            if( $element.hasClass('active') ){
              self.pause();
            }else{
              self.start();
            }
          }
        }

        console.log('init todaysWork',task.todaysWork)

        $scope.timer = new Timer($scope.exId);
        $scope.timer.init();

        console.log('task', task);
        $scope.$on('pause-timer', function(event, exclusiveId){
          if(exclusiveId != $scope.timer.exclusiveId && $scope.timer.active){
            console.log('exId', exclusiveId)
            $scope.timer.pause();
          }
        })
      }
    };
  });
