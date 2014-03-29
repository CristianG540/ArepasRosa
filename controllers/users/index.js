var express = require('express');
var app = module.exports = express();

// La linea siguiente sirve para declarar el directorio donde van las vistas de jade, 
// pero como creare un api restful no es necesario
//app.set('views', __dirname + '/views');

app.get('/users', function(req, res) {

  res.send('Hola, desde el controlador de users');

});