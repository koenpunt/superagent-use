var _superagent = require('superagent');
var methods = require('methods');
var assign = require('object-assign');

var uses = [];

var superagent = assign({}, _superagent);

superagent.use = function(fn) {
  uses.push(fn);
  return this;
};

methods.indexOf('del') == -1 && methods.push('del');
methods.forEach(function(method) {
  superagent[method] = function() {
    var request = _superagent[method].apply(superagent, arguments);
    uses.forEach(function(use) {
      request = request.use(use);
    });
    return request;
  };
});

module.exports = superagent;
