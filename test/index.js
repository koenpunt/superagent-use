var should = require('should');

describe('superagent-use', function() {
  var superagent;
  var prefix = 'http://example.com';
  var prefixMiddleware = function(request) {
    if(request.url[0] === '/') {
      request.url = prefix + request.url;
    }
    return request;
  };

  beforeEach(function() {
    /* superagent-use modifies the superagent object, so we need to remove
       the `require` cache in order to get a new instance for each test. */
    delete require.cache[require.resolve('superagent')];
    superagent = require('superagent');
    require('..')(superagent);
  });

  it('should apply plugin to all requests', function() {
    superagent
      .use(prefixMiddleware);

    var req1 = superagent.get('/');
    req1.request()._headers.host.should.equal('example.com');

    var req2 = superagent.patch('/update');
    req2.request()._headers.host.should.equal('example.com');
  });

  it('should be chainable', function() {
    var req = superagent
      .use(prefixMiddleware)
      .get('/');

    req.request()._headers.host.should.equal('example.com');

  });

});
