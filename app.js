var express = require('express');
var http = require('http');
var bodyParser  = require('body-parser');
var routes  = require('./routes/routes');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use("/bower_components", express.static(__dirname + "/public/bower_components"));
app.use("/favicon", express.static(__dirname + "/public/favicon"));

if (process.env.NODE_ENV === "DEVELOPMENT") {
	app.use("/css", express.static(__dirname + "/public/css"));
	app.use("/app", express.static(__dirname + "/public/app"));
}
else if (process.env.NODE_ENV === "PRODUCTION") {
	app.use("/css", express.static(__dirname + "/dist/css"));
	app.use("/app", express.static(__dirname + "/dist/app"));
	app.use("/dist", express.static(__dirname + "/dist"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/config', routes.getDB);
app.put('/config', routes.setDB);

app.get('*', function(req, res) {
    res.sendFile(__dirname+'/dist/index.html');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});