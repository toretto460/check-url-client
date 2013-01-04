var redis = require('redis'),
		url = require('url');

exports.createClient = function() {
	redis_to_go_url = process.env.REDISTOGO_URL || "redis://redistogo:4afeac05d16c74c96aa3ec1847581ccb@spadefish.redistogo.com:9698/";

	if(redis_to_go_url) {
		rtg = url.parse(redis_to_go_url);
		redistogo = redis.createClient(rtg.port, rtg.hostname);
		redistogo.auth(rtg.auth.split(':')[1]);
		return redistogo
	} else {
		redis = redis.createClient(6279, 'localhost');
		redis.auth("");
		return redis;
	}	
}