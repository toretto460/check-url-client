var flatiron = require('flatiron'),
		redis = require('redis'),
    path = require('path'),
    app = flatiron.app,
    io = require('socket.io');    

app.config.file({ file: path.join(__dirname, 'config', 'config.json') });

app.use(flatiron.plugins.http);
app.use(socketful);

app.router.get('/', function () {
  this.res.json({ 'hello': 'world' })
});

app.start(3000);
io.listen(app);

io.sockets.on('connection', function (socket) {

	console.log('connected');

		var db = redis.createClient(redisConf.port, redisConf.host);
		db.auth(redisConf.psw);
		db.subscribe(queue);
		


		db.on('message',function(channel, message){
			socket.emit('message', message);
		});

		socket.on('disconnect', function(){
			db.unsubscribe();
			db.end();
		});	

});
