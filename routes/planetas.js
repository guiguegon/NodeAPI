var express = require('express');
var router = express.Router();
var PlanetaDAO = require('../models/planeta').PlanetaDAO;

function planetas(db) {
  var planetaDAO = new PlanetaDAO(db);

  router.route('/')
    .all(function(req, res, next) {
        next();
    })
    .post(function(req, res) {
    		if(req.body.planeta !== undefined) {
    			var nuevoPlaneta = req.body.planeta;
          planetaDAO.insertPlaneta(nuevoPlaneta, function (err, result) {
             if (err) {
               res.send({'error':'Ha ocurrido un error en el servidor'});
             }
             //preparamos la respuesta
             res.status(201);
             console.log('Result Router: %j', result);
             // Enviamos la respuesta
             res.json({
               planeta: result
             });
           });

    		} else {
    			console.log('body empty');
    			res.status(400);
    			res.end('bad request');
    		}
      })
      .get(function(req, res) {
        planetaDAO.getPlanetas(function (err, result) {
         if (err) {
           res.send({'error':'Ha ocurrido un error en el servidor'});
         }

         res.json({
           planetas: result
         });
       });
      });

      router.route('/:id')
       .get(function (req, res) {

         var id = req.params.id;

         planetaDAO.getPlanetaById(id, function (err, planeta) {
           if (err) {
             res.send({'error':'Ha ocurrido un error en el servidor'});
           }

           if (!planeta) {
             return res.status(404).send({ error: 'Planeta no encontrado' });
           }

           res.json({
             planeta: planeta
           });

         });
       })

       .put(function (req, res) {
         var id = req.params.id;

         if (!id) {
           return next();
         }

         var planetaActualizado = req.body.planeta;

         planetaDAO.updatePlaneta(id, planetaActualizado, function (err, planeta) {
           if (err) {
             res.send({'error':'Ha ocurrido un error en el servidor'});
           }

           res.json({
             planeta: planeta
           });

         });
       })

       .delete(function (req, res) {
         var id = req.params.id;

         if (!id) {
           return next();
         }

         planetaDAO.removePlaneta(id, function (err) {
           if (err) {
             res.send({'error':'Ha ocurrido un error en el servidor'});
           }

           res
           .status(204)
           .send();

         });
       });

  this.router = router;
}

module.exports = planetas;
