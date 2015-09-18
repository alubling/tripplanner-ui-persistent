function TripPlanner(el, map, defaultMarker){
  this.map = map;
  this.defaultMarker = defaultMarker;
  this.markers = [ this.defaultMarker ];
  this.defaultMarker.setMap(this.map);
  this.$el = $(el);
  this.trip = new Trip();
  this.removeDayButton = $('.remove-day-button', this.$el);
  this.addDayButton = $('.add-day-button', this.$el);
  this.dayPicker = $('.day-picker', this.$el);
  this.init();
}

TripPlanner.prototype.init = function(){
  var that = this;

  $('.add-item', this.$el).click(function(){
    var selector = $(this).parents('.planner-picker').find('select');
    var id = selector.val();
    var label = $(this).attr('data-label');
    var item = _.findWhere(data[label], {_id: id });
    that.trip.addItem(item);
    that.renderItem(item);
  });

  ['Hotels', 'Restaurants', 'Activities'].forEach(function(label){
    var $list = $('.' + label +  '-list', this.$el);
    $list.on('click', 'li', function(){
      that.trip
        .removeItemByIdAndLabel($(this).attr('data-id'), $(this).attr('data-label'));
      $(this).remove();
      that.removeMarker($(this).attr('data-id'));
    });
  }, this);

  this.dayPicker.on('click', 'li', function(){
    that.trip.idx = $(this).index();
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    that.renderDay();
  });

  this.renderDayPicker();

  this.addDayButton.click(function(){
    that.trip.addDay();
    that.renderDayPicker();
  });
  this.removeDayButton.click(function(){
    that.trip.removeDay();
    that.renderDayPicker();
  });
}

TripPlanner.prototype.renderDayPicker = function(){
  this.dayPicker.empty();
  this.trip.days.forEach(function(day, index){
    var listItem = $("<li />");
    if(day == this.trip.currentDay())
      listItem.addClass('active');
    var link = $("<a />");
    link.html(index + 1);
    listItem.append(link);
    this.dayPicker.append(listItem);
  }, this); 
  $('li.active', this.dayPicker).click();
}

TripPlanner.prototype.renderDay = function(){
  this.clearLists();
  this.markers.forEach(function(marker){
    if(marker != this.defaultMarker){
      marker.setMap(null);
    }
  }, this);
  this.markers = [this.defaultMarker];
  var bounds = new google.maps.LatLngBounds();
  bounds.extend(this.defaultMarker.position);
  this.map.fitBounds(bounds);
  var day = this.trip.currentDay();
  ['Hotels', 'Restaurants', 'Activities'].forEach(function(label){
    var items = this.trip.currentDay()[label];
    items.forEach(function(item){
      this.renderItem(item);
    }, this);
  }, this);
};

TripPlanner.prototype.renderItem = function(item){
  var $list = $('.' + item.label +  '-list', this.$el);
  var $listItem = $("<li />");
  $listItem.attr('data-label', item.label);
  $listItem.attr('data-id', item._id);
  $listItem.addClass('list-group-item');
  $listItem.html(item.name);
  $list.append($listItem);
  this.addMarker(item);
}

TripPlanner.prototype.addMarker = function(item){
    var position = item.place[0].location;
    var myLatlng = new google.maps.LatLng(position[0],position[1]);
    var marker = new google.maps.Marker({
        position: myLatlng,
        title: item.name
    });
    this.markers.push(marker);
    marker.setMap(this.map);
    marker.id = item._id;
    var bounds = this.map.getBounds();
    bounds.extend(marker.position);
    this.map.fitBounds(bounds);
}


TripPlanner.prototype.clearLists = function(){
  ['Hotels', 'Restaurants', 'Activities'].forEach(function(label){
    var $list = $('.' + label +  '-list', this.$el);
    $list.empty();
  }, this);

}

TripPlanner.prototype.removeMarker = function(id){
  var marker = _.remove(this.markers, {id: id });
  marker[0].setMap(null);
  var bounds = new google.maps.LatLngBounds();
  this.markers.forEach(function(marker){
    bounds.extend(marker.position);
  });
  this.map.fitBounds(bounds);
  //reset bounds
}









