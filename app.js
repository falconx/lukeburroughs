var express = require('express'),
    path    = require('path'),
	app     = express(),
	env     = process.env.NODE_ENV || 'development';

// Server configuration

app.engine('html', require('ejs').renderFile);

app.set('port', process.env.PORT || 5000);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));

// Export run to be called from Gulp task

module.exports = {
	run: function() {
		app.listen(app.get('port'), function() {
			console.log('Express server listening on port ' + app.get('port'));
		});
	}
};