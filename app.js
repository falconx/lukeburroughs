var express = require('express'),
    path    = require('path'),
    gulp    = require('gulp');

var app = express();
var env = process.env.NODE_ENV || 'development';

/**
 * Configuration
 */

app.engine('html', require('ejs').renderFile);

app.set('port', process.env.PORT || 5000);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public', 'dist')));

/**
 * Route all traffic to angular directory for further routing
 */

// app.get('*', function( req, res ) {
// 	res.redirect('index');
// });

/**
 * Run server
 */

// module.exports = {
	// run: function() {
		app.listen(app.get('port'), function() {
			console.log('Express server listening on port ' + app.get('port'));
		});
	// }
// };
