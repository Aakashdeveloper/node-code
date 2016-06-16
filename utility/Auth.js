module.exports = {

  isLoggedIn: function(request, response){
	  if(request.session.username != 'Admin'){
			  response.redirect('/');
	  }
  },

  findHostName: function(url){
    var url = url.trim();
    if(url.search(/^https?\:\/\//) != -1)
      url = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i, "");
    else
      url = url.match(/^([^\/?#]+)(?:[\/?#]|$)/i, "");
    return url[1];
  },

  addslashesjs: function(str){
    return str.replace(/\\/g, '\\\\').
              replace(/\u0008/g, '\\b').
              replace(/\t/g, '\\t').
              replace(/\n/g, '\\n').
              replace(/\f/g, '\\f').
              replace(/\r/g, '\\r').
              replace(/'/g, '\\\'').
              replace(/"/g, '\\"');
  },
} ;
