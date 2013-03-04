var redis = require('redis'),
		url = require('url');

exports.createClient = function() {
	redis_to_go_url = process.env.REDISTOGO_URL;
	
	if(redis_to_go_url) {
		try {
			rtg = url.parse(redis_to_go_url);
			redistogo = redis.createClient(rtg.port, rtg.hostname);
			redistogo.auth(rtg.auth.split(':')[1]);
		} catch (e) {
			throw "Redis connection error: please ensure that REDISTOGO_URL environment variable are correctly defined and redis is running."
		} finally {
			return redistogo;	
		}
	} else {
		r = redis.createClient('6379', 'localhost');
		r.auth("");
		return r;
	}	
}