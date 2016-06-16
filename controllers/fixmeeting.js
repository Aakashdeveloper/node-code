var url = require('url') ;
var request = require('request');

module.exports = function(app){

	app.post('/fixmeeting', function(request, response) {
		Auth.isLoggedIn(request, response);
		
		var JSONdata = {'CalendarId': calendarId, 'StartTime': time, 'Duration': durationInMinutes, 'StartDate': date, 'subject': subject_description};
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
			if(response.meetingID != '' || typeof meetingID != 'undefined'){
				JSONdata.meetingID = response.meetingID;
				//Update the database
				updateMeetings(JSONdata);
				response.send('Meeting has been fix with Id: '+ response.meetingID);
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
			CalendarId: obj.calendarId, 
			StartTime: obj.time, 
			Duration: obj.durationInMinutes, 
			StartDate: obj.date,
			subject: obj.subject_description,
			status:1}
		},
		{ upsert: true }
	)
}
			
