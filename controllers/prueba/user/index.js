var express = require('express');
var app = module.exports = express();

// La linea siguiente sirve para declarar el directorio donde van las vistas de jade
app.set('views', __dirname + '/views');

app.get('/user/new', function(req, res) {
	res.render('newUser');
});

app.post('/user/add', function(req, res) {
	/**
	 * Esta variable recibe parametros(request) de tipo POST 
	 * @type {object}
	 */
	var dataUser = req.body;

	/**
	 * Podemos acceder a db sin hacer require por que es global
	 */
	var newUser = new db.User({
		name: dataUser.name,
		birthdate: dataUser.birthdate,
		isAdmin: dataUser.isAdmin === 'on' ? true : false  // http://lineadecodigo.com/javascript/operador-ternario-en-javascript/
	});

	/**
	 * también podía hacer 'new db.User(u)'
	 * porque los campos del formulario
	 * tienen el mismo nombre del las
	 * propiedades del modelo. Para
	 * efectos demostrativos aquí cree
	 * un objeto con las mismas propiedades
	 * y les asigné los valores que vienen
	 * del formulario.
	 */
	newUser.save(function(error, user){
		if (error) {
			res.json(error);
		}
		res.redirect('/user/list');
	});

});

app.get('/user/list', function(req, res) {

	db.User
		.find()
		.exec(function(error, users) {
			if (error){
				return res.json(error);	
			} 
			return res.render('listUser', {
				users: users
			});

		});

});