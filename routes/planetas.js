var express = require('express');
var router = express.Router();

var planetas = {};

router.route('/')
  .all(function(req, res, next) {
      next();
  })
  .post(function(req, res) {
  		if(req.body.planeta !== undefined) {
  			var nuevoPlaneta = req.body.planeta;
  			nuevoPlaneta.id = Date.now();

  			planetas[nuevoPlaneta.id] = nuevoPlaneta;

  			res.set('Content-Type', 'application/json');
  			res.status(201);
  			res.json({
  				planeta: nuevoPlaneta
  			});

  		} else {
  			console.log('body empty');
  			res.status(400);
  			res.end('bad request');
  		}
    })
    .get(function(req, res) {
    	res.json({
    		'planetas':planetas
    	});
    });

  router.route('/:id?')
    .get(function(req, res) {
  		var id = req.params.id;
  		if(id !== undefined) {
  			var planeta = planetas[id];

  			if(planeta !== undefined) {
  				res.set(200);
  				res.json(planeta);
  			} else {
  				res.status(404);
  				res.end('Not found');
  			}
  		} else {
  			res.status(400);
  			res.end('Bad request');
  		}
  });


  module.exports = router;
