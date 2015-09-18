var express = require('express');
var Promise = require('bluebird');
var chalk = require('chalk');

var models = require('./models');
var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var Activity = models.Activity;
var swig = require('swig');
var path = require('path');
var daysRouter = require('./routes/api/days');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(path.join(__dirname , 'public')));

swig.setDefaults({ cache: false });

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/api/days', daysRouter);

if(!process.env.API_KEY)
  console.log(chalk.red('add api key to npm start'));

console.log(chalk.magenta('make sure to start sass watcher - gulp sass:watch'));



app.get('/', function(req, res, next){
  Promise.all([ Hotel.find(), Restaurant.find(), Activity.find()])
    .then(function(results){
      var data = {
        hotels: results[0],
        restaurants: results[1],
        activities: results[2],
        apiKey: process.env.API_KEY
      };
      data.dropDownItems = function(label, items){
        return {
          items: items,
          label: label
        }
      }
      return data;

    })
    .then(function(data){
      res.render('index', data);
    })
    .catch(function(err){
      next(new Error(err));
    });

});

// app.use(function(err, req, res, next){
  // console.log(err.message);
  // res.send(err.message);

// });


app.listen(3000);
