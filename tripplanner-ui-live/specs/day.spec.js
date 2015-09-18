describe('Day', function(){
  var day;
  beforeEach(function(){
    day = new Day();
  
  });
  it('exists', function(){
    expect(Day).toBeDefined();
  });
  it('can be created', function(){
    expect(day).toBeDefined();
  });
  describe('adding items', function(){
    it('can add a Hotel', function(){
      expect(function(){ day.addItem({label: 'Hotels'}); }).not.toThrow();
      expect(day.Hotels.length).toEqual(1);
    });
    it('can add a Restaurant', function(){
      expect(function(){ day.addItem({label: 'Restaurants'}); }).not.toThrow();
      expect(day.Restaurants.length).toEqual(1);
    });
    it('can add an Activity', function(){
      expect(function(){ day.addItem({label: 'Activities'}); }).not.toThrow();
      expect(day.Activities.length).toEqual(1);
    });

    it('can not add a Foo', function(){
      expect(function(){ day.addItem({label: 'Foos'}); }).toThrow();
    });

    it('can only add an item once', function(){
      var item = { label: 'Activities' };
      expect(function(){ day.addItem(item)}).not.toThrow();
      expect(day.Activities.length).toEqual(1);
      expect(function(){ day.addItem(item); }).toThrow();
    });
  });

  describe('can remove an item by id and label', function(){
    it('can remove an item by id', function(){
      var hotel = {_id: 99, name: 'Foo Hotel', label: 'Hotels'};
      day.addItem(hotel);
      expect(day.Hotels.length).toEqual(1);
      var item = day.removeItemByIdAndLabel(99, 'Hotels');
      expect(day.Hotels.length).toEqual(0);
      expect(item).toBe(hotel);
    });
  
  });
});
