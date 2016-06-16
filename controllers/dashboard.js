var url = require('url') ;
var EJS = require('ejs') ;


module.exports = function(app){

	app.get('/dashboard', function(request, response) {
		//check for authentication
		Auth.isLoggedIn(request, response);
		
		//get stats from db
		var stats = getStatistics();
		
		//send output to the browser
		var ejsfile = fs.readFileSync(__DOCUMENT_ROOT__ + '/templates/dashboard.ejs', 'utf8') ;
		var result = EJS.render(ejsfile, {stats:stats}) ;
		response.send(result) ;
	}) ;
}

function getStatistics(){
	//can get data from database, you can refer third party api's the code is there, so hardcoding response here
	return [
		{meetingid: 'm1', date: '22-05-2016', subject: 'sub1'},
		{meetingid: 'm2', date: '22-05-2016', subject: 'sub2'},
		{meetingid: 'm3', date: '22-05-2016', subject: 'sub3'},
		]
	
}
			
