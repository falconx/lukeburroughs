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

app.use(express.static(path.join(__dirname, 'public')));

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
