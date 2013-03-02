var APIeasy = require('api-easy'),
		assert  = require('assert');

APIeasy
	.describe('application')
  .use('localhost', 8080)
  .discuss('When using the api')
  		.discuss('with no url in the db')
      .get('/url/all').expect(200,{result: true, data: null})
      .get('/url/new')
      	.expect('should return an html form', function(err, res, body){
      		assert.equal(err, null);
      		assert.equal(res.statusCode, 200);
      	})
		  .export(module);