'use strict';

/**
 * @ngdoc directive
 * @name schedulerApp.directive:notch
 * @description
 * # notch
 */
angular.module('schedulerApp')
  .directive('notch', function () {
    return {
      templateUrl: 'templates/notch.html',
      restrict: 'E',
      scope:{},
      link: function postLink(scope, element, attrs) {

        console.log(element.find('div.cont').find('span'))

          $(element.find('div.cont').find('span')).click(function(){
            if ($(this).hasClass('first')){
                scope.$apply(function(){
                  scope.percent = 0;
                })
                $(this).nextAll().removeClass('border-change');
               }else if ($(this).hasClass('second')){
                $(this).nextAll().removeClass('border-change');
                scope.$apply(function(){
                  scope.percent = 25;
                })
                $(this).prevAll().addClass('border-change');
                $(this).addClass('border-change');
               }else if ($(this).hasClass('third')){
                $(this).nextAll().removeClass('border-change');
                scope.$apply(function(){
                  scope.percent = 50;
                })
                $(this).prevAll().addClass('border-change');
                $(this).addClass('border-change');
               } else if ($(this).hasClass('fourth')){
                scope.$apply(function(){
                  scope.percent = 75;
                });
                  $(this).addClass('border-change');
                 $(this).nextAll().removeClass('border-change');
                $(this).prevAll().addClass('border-change');
               }else{
                scope.$apply(function(){
                  scope.percent = 100;
                })
                 $(this).addClass('border-change');
                $(this).prevAll().addClass('border-change');
               }
          });

          scope.percent = 0

            $('span.second').click()
            $('span.first').click()
      }
    };
  });
