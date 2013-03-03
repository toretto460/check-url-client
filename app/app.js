var app = require('express')(),
		express = require('express'),
    path = require('path'),
	  redis = require('../lib/redistogo'),
    env = process.env.NODE_ENV || 'development',
    settings = require('../config/config_' + env + '.json');

//Look for static files in "/public" folder
app.configure(function(){
	app.set('port', process.env.PORT || 8080);
	app.use(require('express').static(__dirname + '/../public'));
	app.engine('html', require('hbs').__express);
	app.set('view engine', 'html');
	app.set('views', __dirname + '/../views');
	app.use(express.bodyParser());
});

//Routes array
var routes = {
  	'url_add': "/url/add",
  	'url_new': "/url/new",
  	'url_all': "/url/all"
  };

var sets = {
	'url_set': "urls"
};

var default_redis = redis.createClient();

// GET /url/new
app.get(routes.url_new, function(req, res){
  // get a form for insert new url
  var data = {
  	url: routes.url_add,
  	default_timeout: '10'
  }
  res.render('forms/url-form.html', data);
});

// GET /url/new
app.get(routes.url_all, function(req, res){
  // get a all entries in url set
  var urls = {};
  set_result = default_redis.hgetall(sets.url_set, function (err, data) {
  	urls = data;
  	if( err ) {
  		res.json(500,{});
  	} else {
  		res.json(200, { result: true, data: urls});	
  	}
  	res.end();
  });
  
});

// POST /url/add
app.post(routes.url_add, function(req, res){
	//save url with name, url and timeout value
	//save a key on redis and publish a start message on a queue
  
  var url_data = {
  	url : req.body.url || '', 
  	name: req.body.name || '', 
  	timeout: req.body.timeout || ''
  };

  set_result = default_redis.hset(sets.url_set, url_data.name, JSON.stringify(url_data));
  res.json(200, { result: set_result});
  res.end();
});

var server = app.listen(app.get('port'));
var io = require('socket.io').listen(server);
var queue = settings.queue_subscribe.name;

io.sockets.on('connection', function (socket) {

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
