'use strict';

describe('myApp.exercise1 module', function() {

  beforeEach(module('myApp.exercise1'));

  describe('exercise1 controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var exercise1Ctrl = $controller('Exercise1Ctrl');
      expect(Exercise1Ctrl).toBeDefined();
    }));

  });
});