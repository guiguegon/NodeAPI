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
  })
  .put(function(req, res) {
    if(req.body.planeta !== undefined) {
      var nuevoPlaneta = req.body.planeta;
      var id = req.params.id;
      nuevoPlaneta.id = parseInt(id, 10);

      if(planetas[id] !== undefined) {
          planetas[id] = nuevoPlaneta;
          res.set('Content-Type', 'application/json');
          res.status(200);
          res.json({
            planeta: nuevoPlaneta
          });
      } else {
        console.log('planeta with id ' + id + ' not found');
        res.status(404);
        res.end('not found');
      }

    } else {
      console.log('body empty');
      res.status(400);
      res.end('bad request');
    }

  })
  .delete(function(req, res) {
    var id = req.params.id;
    if(id !== undefined) {
      if(planetas[id] !== undefined) {
          delete planetas[id];
          res.json({
        		'planetas':planetas
        	});
      } else {
        console.log('planeta with id ' + id + ' not found');
        res.status(404);
        res.end('not found');
      }

    } else {
      console.log('id empty');
      res.status(400);
      res.end('bad request');
    }
  });


  module.exports = router;
