var express = require('express');
var http = require('http');
var bodyParser  = require('body-parser');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use("/app", express.static(__dirname + "/public/app"));
app.use("/img", express.static(__dirname + "/public/app/img"));
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/bower_components", express.static(__dirname + "/public/bower_components"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('*', function(req, res) {
    res.sendFile(__dirname+'/public/index.html');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

module.exports = app;