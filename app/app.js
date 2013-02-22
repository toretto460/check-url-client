var app = require('express')(),
    path = require('path'),
    settings = require('../config/config.json');

var port = process.env.PORT || 8080;

var server = app.listen(port);
var io = require('socket.io').listen(server);
var queue = settings.queue_subscribe.name;

//Look for static files in "/public" folder
app.configure(function(){
	app.use(require('express').static(__dirname + '/../public'));	
});

io.sockets.on('connection', function (socket) {

	var redis = require('../lib/redistogo');
	sub = redis.createClient();
	sub.subscribe(queue);

	pub = redis.createClient();
	
	//presentation message
	socket.emit('presentation', settings.queue_subscribe.schema);

	pub.publish(settings.queue_publish.name, 'new-client');
	console.log('connection');

	sub.on('message',function(channel, message){
		socket.emit('message', message);
	});

	socket.on('disconnect', function(){
		sub.unsubscribe();
		sub.quit();
		pub.quit();
	});	

});
