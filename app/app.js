var app = require('express')(),
    path = require('path'),
    settings = require('../config/config.json');

//Look for static files in "/public" folder
app.configure(function(){
	app.set('port', process.env.PORT || 8080);
	app.use(require('express').static(__dirname + '/../public'));
	app.engine('html', require('hbs').__express);
	app.set('view engine', 'html');
	app.set('views', __dirname + '/../views');
});

//Routes array
var routes = {
  	'url_add': "/url/add",
  	'url_new': "/url/new"
  }

// POST /url/new
app.get(routes.url_new, function(req, res){
  // get a form for insert new url
  var data = {url: routes.url_add}
  res.render('forms/url-form.html', data);
});

// POST /url/add
app.post(routes.url_add, function(req, res){
	//save url with id, name and timeout value
	//seve a key on redis and publish a start message on a queue
	//....write the code
	console.log('implement POST: /url/add');
	res.end();
});

var server = app.listen(app.get('port'));
var io = require('socket.io').listen(server);
var queue = settings.queue_subscribe.name;

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
