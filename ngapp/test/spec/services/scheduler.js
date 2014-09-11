'use strict';

describe('Service: scheduler', function () {

  // load the service's module
  beforeEach(module('schedulerApp'));

  // instantiate service
  var scheduler;
  beforeEach(inject(function (_scheduler_) {
    scheduler = _scheduler_;
  }));

  it('should do something', function () {
    expect(!!scheduler).toBe(true);
  });

});
