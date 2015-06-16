// Dependencias
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');

// Instancia aplicación
var app = express();

//Middleware
app.use(bodyParser.json());
app.use(logger('dev'));

var planetas = [];

// Rutas
app.get('/', function(req, res) {
	res.send('Hola mundo');
});

app.get('/planetas', function(req, res) {
	res.json({
		'planetas':planetas
	});
});


app.post('/planeta/nuevo', function(req, res) {
		if(req.body.planeta !== undefined) {
			var nuevoPlaneta = req.body.planeta;
			nuevoPlaneta.id = '123';

			planetas.push(nuevoPlaneta);

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

});

app.listen(80);
console.log('Servidor iniciado en el puerto 80');
