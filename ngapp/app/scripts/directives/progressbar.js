'use strict';

/**
 * @ngdoc directive
 * @name schedulerApp.directive:progressBar
 * @description
 * # progressBar
 */
angular.module('schedulerApp')
  .directive('progressBar', function () {
    return {
      templateUrl: 'templates/parent()rogress-bar.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
