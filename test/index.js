var should = require('should');

describe('superagent-use', function() {

  var superagent;

  beforeEach(function() {
    superagent = require('..');
  });

  it('should apply plugin to all requests', function() {
    var prefix = 'http://example.com';
    superagent
      .use(function(request) {
        if(request.url[0] === '/') {
          request.url = prefix + request.url;
        }
        return request;
      });

    var req1 = superagent.get('/');
    req1.request()._headers.host.should.equal('example.com');

    var req2 = superagent.patch('/update');
    req2.request()._headers.host.should.equal('example.com');
  });

  it('should be chainable', function() {
    var prefix = 'http://example.com';
    var req = superagent
      .use(function(request) {
        if(request.url[0] === '/') {
          request.url = prefix + request.url;
        }
        return request;
      })
      .get('/');

    req.request()._headers.host.should.equal('example.com');

  });

});
