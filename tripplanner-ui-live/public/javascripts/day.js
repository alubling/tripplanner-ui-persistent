function Day(){
  this.Hotels = [];
  this.Restaurants = [];
  this.Activities = [];
}

Day.prototype.addItem = function(item){
/*  if( ['Hotels', 'Restaurants', 'Activities'].indexOf(item.label) == -1)
    throw new Error(item.label + ' is not supported');
  if(this[item.label].indexOf(item) != -1)
    throw new Error(item.name + ' has already been added');
  this[item.label].push(item);*/
}

Day.prototype.removeItemByIdAndLabel = function(id, label){
  var removed = _.remove(this[label], {_id: id });
  return removed[0];

}
