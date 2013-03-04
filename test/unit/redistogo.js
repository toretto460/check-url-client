var should = require('should');

describe('Redis', function(){
  var redis = require('../../lib/redistogo');
  
  describe('#createClient()', function(){

    describe('with correct connection path', function(){
      process.env.REDISTOGO_URL = "redis://:@localhost:6379";
      it('return a correct instance of redis client', function(done){
        var client = redis.createClient();
        client.should.be.ok;          
        done();
      });
    });

    describe('with bad connection path', function(){
      process.env.REDISTOGO_URL = "redis://";
      it('return a correct instance of redis client', function(done){
        var client = redis.createClient();
        client.should.throw();      
        done();
      });
    });

  });
});