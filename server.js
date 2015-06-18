// Dependencias
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');

// Instancia aplicación
var app = express();
var port = process.env.PORT || 80;

//Middleware
app.use(bodyParser.json());
app.use(logger('dev'));

var planetas = {};

// Rutas
app.get('/', function(req, res) {
	res.send('Hola mundo');
});

var router = require('./routes/planetas');
app.use('/planetas', router);

app.listen(port);
console.log('Servidor iniciado en el puerto ' + port);
