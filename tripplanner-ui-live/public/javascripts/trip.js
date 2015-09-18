function Trip(){
  this.days = [ new Day()];
  this.idx = 0;
}

Trip.prototype.currentDay = function(){
  return this.days[this.idx];
}

Trip.prototype.addDay = function(day){
  var newDay = day || new Day();
  this.idx = this.days.length - 1;
  var that = this;

  $.ajax({
    method: 'POST',
    url: '/api/days/' + this.idx,
    data: newDay,
    success: function (responseData) {
        console.log(responseData);
        that.days.push(newDay);
    },
    error: function (errorObj) {
        console.log(errorObj);
    }
});
}

Trip.prototype.removeDay = function(){
  this.days.splice(this.idx, 1);
  this.idx = 0;
  if(this.days.length == 0)
    this.addDay();
}

Trip.prototype.addItem = function(item){
  this.currentDay().addItem(item);
}

Trip.prototype.removeItemByIdAndLabel = function(id, label){
  this.currentDay().removeItemByIdAndLabel(id, label);
}


