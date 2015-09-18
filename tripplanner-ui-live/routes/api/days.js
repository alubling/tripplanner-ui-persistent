
var express = require('express');
var router = express.Router();
var promise = require('bluebird');
var model = require('../../models/index');

// ************************************
// get all days
router.get('/all', function(req, res) {
	res.send('hello all');
});
// ************************************
// add or delete a day by id
router.delete('/:id', function(req, res) {
	console.log(req.params.id);
});

router.post('/:id', function(req, res) {
	var dayId = req.params.id;
	var day = req.body;
	
	model.Day.insert({
		number: dayId, 
		hotels: [],
		restaurants: [],
		activities: []
	}, function(err, data) {
		console.log(err);
		console.log(data);
	});

	// TODO: Insert Day from Request Object into Mongo

});

router.get('/:id', function(req, res) {
	res.send(req.params.id);
});
// ************************************

router.post('/:id/restaurants', function(req, res) {
	console.log(req.params.id);
});

// ************************************
// add or delete a restaurant by restId
router.route('/:id/restaurant/:restId')
	.post(function(req, res) {
		console.log(req.params.restId);
	})
	.delete(function(req, res) {
		console.log(req.params.restId);
	});
// ************************************
// add or delete an activity by actId
router.route('/:id/activity/:actId')
	.post(function(req, res) {
		console.log(req.params.actId);
	})
	.delete(function(req, res) {
		console.log(req.params.actId);
	});
// ************************************
// add or delete a hotel by hotelId
router.route('/:id/hotel/:hotelId')
	.post(function(req, res) {
		console.log(req.params.hotelId);
	})
	.delete(function(req, res) {
		console.log(req.params.hotelId);
	});
// ************************************




module.exports = router;