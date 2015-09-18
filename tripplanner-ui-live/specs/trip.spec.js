describe('Trip', function(){
  var trip;
  beforeEach(function(){
    trip = new Trip();
  });

  it('can be created', function(){
    expect(trip).toBeDefined();
    expect(trip.days.length).toEqual(1);
    expect(trip.currentDay()).toBe(trip.days[0]);
  });

  describe('adding a day', function(){
    it('can add a day', function(){
      var day2 = new Day();
      trip.addDay(day2);
      expect(trip.days.length).toEqual(2);
      expect(trip.currentDay()).toBe(day2);
    });
  });

  describe('can remove day', function(){
    it('removes the day', function(){
      var firstDay = trip.currentDay();
      trip.addDay();
      expect(trip.days.length).toEqual(2);
      trip.removeDay();
      expect(trip.days.length).toEqual(1);
    });

    it('removes day will always leave one day', function(){
      expect(trip.days.length).toEqual(1);
      trip.removeDay();
      expect(trip.days.length).toEqual(1);
    });

    it('removes day and sets idx to 0', function(){
      trip.addDay();
      trip.addDay();
      expect(trip.days.length).toEqual(3);
      trip.removeDay();
      expect(trip.days.length).toEqual(2);
      expect(trip.idx).toEqual(0);
    });
  });

  describe('adding an item to a trip', function(){
    it('adds it to the current day', function(){
      trip.addItem({ label: 'Hotels', id: 88 });
      expect(trip.currentDay().Hotels.length).toEqual(1);
    });
  });

  describe('removing an item from a trip', function(){
    it('removes it from the current day', function(){
      trip.addItem({ label: 'Hotels', _id: 88 });
      expect(trip.currentDay().Hotels.length).toEqual(1);
      trip.removeItemByIdAndLabel(88, 'Hotels');
      expect(trip.currentDay().Hotels.length).toEqual(0);
    });
  });
});
