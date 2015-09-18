var mongoose = require('mongoose');
var chalk = require('chalk');

mongoose.connect("mongodb://localhost/tripPlannerData", function(err){
  if(err)
    return console.log(chalk.red(err));

  console.log(chalk.green("connect to database " + mongoose.connection.name));
});

var PlaceSchema = mongoose.Schema(
            {
               address: String,
               city: String,
               state: String,
               phone: String,
               location:[Number]
            }            
);

var Place = mongoose.model('place', PlaceSchema);

var HotelSchema = mongoose.Schema(
      {
         name: String,
         place:[ PlaceSchema ],
         num_stars: Number,
         amenities: String
      }
);

var Hotel = mongoose.model('hotel', HotelSchema);

var RestaurantSchema = mongoose.Schema(
      {
         name: String,
         place:[ PlaceSchema],
         cuisine: String,
         price: Number
      }
);

Restaurant = mongoose.model('restaurant', RestaurantSchema);

var ActivitySchema = mongoose.Schema(
      {
        name: String,
        place:[ PlaceSchema],
        age_range: String
      }
);

Activity = mongoose.model('activity', ActivitySchema);

var DaySchema = mongoose.Schema(
    {
      number: Number,
      hotels: {type: mongoose.Schema.Types.ObjectId, ref: 'Hotel'},
      restaurants: [{type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'}],
      activities: [{type: mongoose.Schema.Types.ObjectId, ref: 'Activity'}]
    }
);

Day = mongoose.model('day', DaySchema);

module.exports = {
  Place: Place,
  Hotel: Hotel,
  Restaurant: Restaurant,
  Activity: Activity,
  Day: Day
}

