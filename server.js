// Dependencias
var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var logger = require('morgan');

// Instancia aplicación
var app = module.exports = express();
var port = process.env.PORT || 80;

MongoClient.connect('mongodb://localhost:27017/planetasDB', function(err, db) {
	if(err) throw err;

	//Middleware
	app.use(bodyParser.json());
	app.use(logger('dev'));

	// Rutas
	var Planetas = require('./routes/planetas');
	var planetasRouter = new Planetas(db).router;
	app.use('/planetas', planetasRouter);

	app.listen(port);
	console.log('Servidor iniciado en el puerto ' + port);
});
