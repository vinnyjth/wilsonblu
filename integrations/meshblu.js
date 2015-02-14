var skynet = require('meshblu');

/**
 * Connect to Skynet.
 */
var conn = skynet.createConnection({
  "uuid": "",
  "token": "",
  "server": "ws://104.236.238.9", // optional - defaults to ws://meshblu.octoblu.com
  "port": 80  // optional - defaults to 80
});

conn.on('notReady', function(data){
  console.log('UUID FAILED AUTHENTICATION!');
  console.log(data);

  // Register a device

  // Login to SkyNet to fire onready event
  conn.authenticate({
    "uuid": data.uuid,
    "token": data.token
  }, function (data) {
    console.log(data);
  });
});

conn.on('ready', function(data){
  console.log('UUID AUTHENTICATED!');
  console.log(data);
});