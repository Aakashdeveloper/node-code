var url = require('url') ;
var EJS = require('ejs') ;


module.exports = function(app){

	app.post('/signin', function(request, response) {
		if(request.body.username == 'Admin'){
			request.session.username = request.body.username;
			response.redirect('dashboard');
		}else{
			response.redirect('/');
		}
	}) ;
}
			
