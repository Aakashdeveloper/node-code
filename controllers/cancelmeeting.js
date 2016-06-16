var url = require('url') ;
var request = require('request');

module.exports = function(app){

	app.post('/cancelmeeting', function(request, response) {
		Auth.isLoggedIn(request, response);
		
		var JSONdata = {'meetingID': meetingID};
		request({
			url: "http://,meetingserver.com/calendarId",
			method: "POST",
			json: true,   
			body: JSONdata
		}, function (error, response, body){
			if(error){
				//console.log(error);
				response.send('Something went wrong') ;
			}
			if(response == 'ok'){
				updateMeetings(obj);
				response.send('Meeting Id ' + response.meetingID + 'has been canceled.');
			}
		});
	}) ;
}


function updateMeetings(obj) {
	mongoconn.collection(mongoConfig.db_coll_meetings).update(
		{
			meetingid:obj.meetingID
		},
		{
			$set:{
			status:0} //0 for canceled meetings
		}
	)
}
			
