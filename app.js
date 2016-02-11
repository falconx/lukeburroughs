var express = require('express');
var path = require('path');
var env = process.env.NODE_ENV || 'development';
var ejs = require('ejs');

var app = express();

app.engine('html', ejs.renderFile);

app.set('port', process.env.PORT || 5000);
app.set('view engine', 'html');

app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), function() {
	console.log('Server listening on port ' + app.get('port'));
});