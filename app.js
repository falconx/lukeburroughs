var express = require('express'),
	  path	= require('path'),
	  gulp    = require('gulp');

var app = module.exports = express();
var env = process.env.NODE_ENV || 'development';

var EXPRESS_PORT = 3000,
	  EXPRESS_ROOT = __dirname;

/**
 * Configuration
 */

app.engine('html', require('ejs').renderFile);

app.set('port', process.env.PORT || EXPRESS_PORT);
app.set('view engine', 'html');

app.use(express.static(path.join(EXPRESS_ROOT, 'public')));

/**
 * Route all traffic to angular directory for further routing
 */

app.get('*', function( req, res ) {
	res.render('index');
});

/**
 * Run server
 */

module.exports = {
	run: function() {
		app.listen(app.get('port'), function() {
			console.log('Express server listening on port ' + app.get('port'));
		});
	}
};
