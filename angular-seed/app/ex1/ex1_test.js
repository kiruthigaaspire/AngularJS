'use strict';

describe('myApp.ex1 module', function() {

  beforeEach(module('myApp.ex1'));

  describe('ex1 controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var Ex1Ctrl = $controller('Ex1Ctrl');
      expect(Ex1Ctrl).toBeDefined();
    }));

  });
});