'use strict';

describe('Airport', function(){
  var airport;
  var plane;

  beforeEach(function(){
    airport = new Airport();
    plane = jasmine.createSpy('plane',['land']);
  });

  it('has no planes by default', function(){
    expect(airport.planes()).toEqual([]);
  });

  describe('conditions are NOT stormy', function() {
    beforeEach(function() {
      spyOn(airport._weather, 'isStormy').and.returnValue(false)
    })
    it('can clear planes for landing', function(){
      airport.clearForLanding(plane);
      expect(airport.planes()).toEqual([plane]);
    });
    it('can clear planes for takeoff', function(){
      airport.clearForLanding(plane);
      airport.clearForTakeOff(plane);
      expect(airport.planes()).toEqual([]);
    });
  })

  describe('under stormy conditions', function(){
    beforeEach(function() {
      spyOn(Math, 'random').and.returnValue(0)
    })
    it('does NOT clear planes for takeoff', function(){
      airport.clearForLanding(plane);
      spyOn(airport._weather, 'isStormy').and.returnValue(true);
      expect(function(){ airport.clearForTakeOff(plane); }).toThrowError('cannot takeoff during storm');
    });
    it('can NOT clear planes for landing', function(){
      spyOn(airport._weather, 'isStormy').and.returnValue(true);
      expect(airport.clearForLanding(plane)).toThrowError('cannot land during storm');
    });
  });
});
