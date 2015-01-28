var express = require('express');
var router = express.Router();

var reviews = [
	{
		id: 0,
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
		res.status(201).send();
		res.send(reviews);	

	}
});

router.delete('/', function(req, res) {
    res.send('ok');
});

router.get('/:id', function(req, res) {

	if(req.params.id) {

			var found = false;

			for(var k=0; k<reviews.length; k++) {

				if((reviews[k].id) == (req.params.id)) {
					
					res.send(reviews[req.params.id]);
					res.status(200).send();

				}
			}


			res.status(404).send();
			res.send('Id introuvable');
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
		res.status(200).send();
		res.send('Modifications effectuées');
	}
});

router.delete('/:id', function(req, res) {
	reviews.splice(req.params.id, 1);
	res.status(200).send();
	res.send("Suppression effectuée");
});

module.exports = router;