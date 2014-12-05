var app = require('./app');
var log = require('./libs/log')(module);

app.set('port', 5000);

var server = app.listen(app.get('port'), function () {
    log.info('Express server listening on port ' + server.address().port);
});