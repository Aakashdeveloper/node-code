var url = require('url') ;
var EJS = require('ejs') ;


module.exports = function(app){

	app.get('/', function(request, response) {
		init(request, response) ;
	}) ;
}

function init(request, response){
	
	if(request.session.username == 'Admin'){
		response.redirect('dashboard');
	}else{
		var ejsfile = fs.readFileSync(__DOCUMENT_ROOT__ + '/templates/index.ejs', 'utf8') ;
		var result = EJS.render(ejsfile, {}) ;
		response.send(result) ;
	}
}
			
