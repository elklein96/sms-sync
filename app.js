var express = require('express');
var http = require('http');
var path = require('path');

var app = express();
var server = http.createServer(app);

var routes = require('./routes/routes');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);

server.listen(process.env.PORT || 3000, function() {
  console.log('Express server listening on port ' + server.address().port);
});

exports.server = server;