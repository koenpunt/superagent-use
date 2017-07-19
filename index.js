var methods = require('methods');
var extend = require('extend');

module.exports = function(_superagent) {
  var superagent = extend({}, _superagent);

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
    superagent[method] = function() {
      var args = [].slice.call(arguments), cb;
      if (typeof args[args.length-1] === 'function') {
        cb = args[args.length-1];
        args = args.slice(0, -1);
      }
      var request = _superagent[method].apply(superagent, args);
      uses.forEach(function(use) {
        request = request.use(use);
      })
      if (cb) request.end(cb)
      return request;
    };
  });

  return superagent;
};
