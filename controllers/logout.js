var url = require('url') ;

module.exports = function(app){
	app.get('/logout', function(request, response) {
		if(request.session.username){
			request.session.destroy(function(err) {
  			// cannot access session here
		})
		}
		response.redirect('/');
	}) ;
}