var express = require('express');
var router = express.Router();

var Reviews = require('../database/reviews');

router.get('/', function(req, res, next) {
    Reviews.find({}, function (err, reviews) {
    	if (err) {
    		res.status(500).send(err);
    	}
    	res.status(200).send(reviews);
    });
});

router.post('/', function(req, res) {
	if (!req.body.name || !req.body.placeType || !req.body.stars) {
		res.status(400).send("Attribut(s) non valide(s)");
	}
	else {
		Reviews.create(req.body, function(err, review){
			if(err) {
				res.status(500).send(err);
			}
			res.status(201).send(review);
		});	

	}
});

router.delete('/', function(req, res) {
    Reviews.remove(function(err, review) {
    	if (err) {
    		res.status(500).send();
    	};
    	res.status(200).send();
    });
});

router.get('/:id', function(req, res) {
	if(req.params.id) {

		Reviews.findById(req.params.id, function(err, review) {
			if (err) {
				res.status(500).send();
			};

			res.status(200).send(review);
		});

	};
});

router.put('/:id', function(req, res) {
	if (!req.body) {
		res.status(400).send();
	}else{
		Reviews.findByIdAndUpdate(req.params.id, req.body, function(err, review) {
			if (err) {
				res.status(500).send();
			};
		});
		res.status(200).send('Modifications effectuées');
	};
});

router.delete('/:id', function(req, res) {
	if (!req.body) {
		res.status(400).send();
	}else{
		Reviews.findByIdAndRemove(req.params.id, function(err, review) {
			if (err) {
				res.status(500).send();
			};
		});
		res.status(200).send('Review supprimée');
	};
});

module.exports = router;