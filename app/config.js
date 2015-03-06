var mongoose = require('mongoose');

var mongoUser = process.env.db_user || 'shortlydev';
var mongoPass = process.env.db_pass || '12345';

var opts = {server: {auto_reconnect: true}, user: mongoUser, pass: mongoPass };
var db = mongoose.createConnection('localhost', 'shortly');

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function (callback) {
  console.log("db connection established...")
});
