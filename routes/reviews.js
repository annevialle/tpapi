var express = require('express');
var router = express.Router();

var reviews = [
	{
		name: 'McDo',
		placeType: 'Fastfood',
		stars: '3'
	}
];

router.get('/', function(req, res, next) {
    res.send(reviews);
});

router.post('/', function(req, res) {
	if (!req.body.name) {
		res.status(400).send();
	}
	else {
		console.log(req.body);
		reviews.push(req.body);
		res.send(reviews);	
	}
});

router.delete('/', function(req, res) {
    res.send('ok');
});

router.get('/:id', function(req, res) {
	if (req.params.id > 1) {
		res.status(404).send();
		res.send("L'id n'existe pas");
	}else{
		res.send(reviews[req.params.id]);
	}
});

router.put('/:id', function(req, res) {
	if (!req.body.name) {
		res.status(400).send();
	}else{
		console.log(req.body.name);
		reviews[req.params.id].name = req.body.name;
		reviews[req.params.id].placeType = req.body.placeType;
		reviews[req.params.id].stars = req.body.stars;
		res.send('Modifications effectuées');
	}
});

router.delete('/:id', function(req, res) {
	reviews.splice(req.params.id, 1);
	res.send("Suppression effectuée");
});

module.exports = router;