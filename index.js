var methods = require('methods');

module.exports = function(superagent) {
  var uses = [];

  superagent.use = function(fn) {
    uses.push(fn);
    return this;
  };

  if(methods.indexOf('del') === -1) {
    methods = methods.slice(0);
    methods.push('del');
  }
  methods.forEach(function(method) {
    var _method = superagent[method];
    superagent[method] = function() {
      var request = _method.apply(this, arguments);
      uses.forEach(function(use) {
        request = request.use(use);
      })
      return request;
    };
  });

  return superagent;
};
