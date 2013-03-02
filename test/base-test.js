var APIeasy = require('api-easy');

APIeasy
	.describe('application')
  .use('localhost', 8080)
  .discuss('When a customer browsing the app')
    .discuss('and visit an existing url')
    .path('/')
      .get().expect(200)
		.undiscuss().unpath()
		.discuss('in a nonexistent url')
		.path('/nonexistent-url')
		  .get().expect(404)
		  .export(module);

