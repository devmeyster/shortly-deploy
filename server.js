var app = require('./server-config.js');

var port = process.env.port || 4568;

app.listen(port);

console.log('Server now listening on port ' + port);
console.log('running in the ', process.env.NODE_ENV);
