var mysql = require('mysql') ;

function Database(dbConfig){
	// set vars
	this.host = dbConfig.mysql_host;
	this.username = dbConfig.mysql_username;
	this.password = dbConfig.mysql_password;
	this.dbname = dbConfig.mysql_dbname;
	this.dbport = dbConfig.mysql_port ;

	this.connection = null;
}

Database.prototype.dbConnect = function() {
	// connect to db
	this.connection = mysql.createConnection({
		host: this.host,
        user: this.username,
        password: this.password,
        database: this.dbname
	}) ;

    this.connection.connect(function(err){
	    if(err){
    		console.log('error when connecting to db:', err) ;
        	throw err ;  
        }
    }) ;

    this.connection.on('error', function(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
    	   	// this.dbConnect() ;
    	   	throw err ;
        }else{
        	throw err;
		}
    }) ;
};

Database.prototype.end = function(){
	this.connection.end() ;

}

Database.prototype.getConnection = function(){
	return this.connection ;
}

Database.prototype.reconnect = function(){

}
// export 
module.exports = Database;