
/**
 * Module dependencies.
 */

var express = require('express');
//var routes = require('./routes');
//var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

require('./models');
// modulos
var login = require('./controllers/login');
var posts = require('./controllers/posts');
var signup = require('./controllers/signup');
var users = require('./controllers/users');

//modulos de prueba
var user =  require('./controllers/prueba/user');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'client/views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'client/public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// rutas
app.use(login);
app.use(posts);
app.use(signup);
app.use(users);

// rutas de prueba
app.use(user);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
