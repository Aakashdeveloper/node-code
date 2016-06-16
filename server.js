//Load required modules
var express = require('express');
var fs = require('fs');
var cluster = require('cluster') ; //to support the application in cluster mode
var http = require('http') ;
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser'); // for reading POSTed form data into `req.body`
var session = require('express-session');
var genuid = require('uid-safe');
var cookieParser = require('cookie-parser'); // the session is stored in a cookie, so we use this to parse it


//Load configs
var mongoConfig = require("./config/mongoconfig.json");
var ServerConfig = require('./config/serverconfig.js') ;
var Auth = require('./utility/Auth.js') ;

//No requirement for mysql db connection, since I am using mongodb only for this assignment
//var dbConfig = require("./config/dbconfig.json");
//var Database = require("./utility/Database");
//var database = new Database(dbConfig) ;
//database.dbConnect();
//var dbconn = database.getConnection() ;

var mongoconnection ; 
//for Production server using authentication credentials
//MongoClient.connect("mongodb://"+mongoConfig.mongo_user+":"+mongoConfig.mongo_password+"@"+mongoConfig.mongo_host+":"+mongoConfig.mongo_port+"/"+mongoConfig.mongo_db, function(err, database) {

//For testing/development
MongoClient.connect("mongodb://"+mongoConfig.mongo_uri+"/"+mongoConfig.mongo_db, function(err, database) {
  if(err) throw err;
    
   mongoconnection = database;
});

	console.log('server init') ;

// for debug line number in cosole.log
Object.defineProperty(global, '__stack', {
  get: function(){
    var orig = Error.prepareStackTrace;
    Error.prepareStackTrace = function(_, stack){ return stack; };
    var err = new Error;
    Error.captureStackTrace(err, arguments.callee);
    var stack = err.stack;
    Error.prepareStackTrace = orig;
    return stack;
  }
});

Object.defineProperty(global, '__line', {
  get: function(){
    return __stack[1].getLineNumber();
  }
});

Object.defineProperty(global, 'mongoconn', {
	get: function(){
		return mongoconnection ;
	}
}) ;

Object.defineProperty(global, 'fs', {
	get: function(){
		return fs ;
	}
}) ;

Object.defineProperty(global, 'mongoConfig', {
	get: function(){
		return mongoConfig ;
	}
}) ;

Object.defineProperty(global, 'ServerConfig', {
	get: function(){
		return ServerConfig ;
	}
}) ;

Object.defineProperty(global, 'Auth', {
	get: function(){
		return Auth ;
	}
}) ;

Object.defineProperty(global, '__DOCUMENT_ROOT__', {
	get: function(){
		return __dirname ;
	}
}) ;

var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/templates');
app.set('view options', { layout:false, root: __dirname + '/templates' });

app.use(cookieParser()) ; 
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
	secret: 'somesecrettoken',
  	resave: true,
    saveUninitialized: true
}))

var controllers_path = __dirname + '/controllers' ;
var controller_files = fs.readdirSync(controllers_path)
controller_files.forEach(function (file) {
	
	var i = file.lastIndexOf('.');
        var ext = (i < 0) ? '' : file.substr(i);
        if(ext.toLowerCase() == '.js') //Its just a extra check to conside *.js files only from controller. Other extension may throw error.
        {
                require(controllers_path+'/'+file)(app) ;
        }
  
}) ;

var nodejs_host_url = ServerConfig.nodejs_config.nodejs_host_url ;


if (cluster.isMaster && ServerConfig.server_environment=="production") {
	//Fork workers.
	for (var i = 0; i < numCPUs; i++) {
		cluster.fork();
	}
	cluster.on('exit', function(worker, code, signal) {
		winston.error("line:"+__line+"=> "+"worker " + worker.process.pid + " died");
	});
}else{
	app.listen(ServerConfig.nodejs_config.nodejs_port);
}

