'use strict';

describe('Directive: addTask', function () {

  // load the directive's module
  beforeEach(module('schedulerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<add-task></add-task>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the addTask directive');
  }));
});
