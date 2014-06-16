var express 	 	= require('express'),
	bodyParser      = require('body-parser'),
	methodOverride  = require('method-override'),
	errorHandler    = require('error-handler'),
	routes		 	= require('./routes'),
	http		 	= require('http'),
	path		 	= require('path');

var app = module.exports = express();
var env = process.env.NODE_ENV || 'development';

// TODO: views?
// TODO: routing vs Angular routing?

/**
 * Configuration
 */

app.engine('html', require('ejs').renderFile);

app.set('port', process.env.PORT || 5000);
// app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(bodyParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

app.use(logfmt.requestLogger());

// Dev mode
if( app.get('env') === 'development' ) {
	// app.use(express.errorHandler());
}

/**
 * Routing
 */

app.get('*', routes.index);
// app.get('/partials/:name', routes.partials);

/**
 * Run
 */

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});