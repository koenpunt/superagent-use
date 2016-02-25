# superagent-use

Global plugin support for SuperAgent

## Summary

Instead of manually calling `use()` for every request, `use()` is called automatically for every request.

## Example

```js

var superagent = require('superagent-use');
var prefix = require('superagent-prefix')('https://api.example.com');

superagent.use(prefix);

superagent
  .post('/auth')
  .send({user: 'foo', pass: 'bar123'})
  .on('request', function(req) {
    console.log(req.url); // => https://api.example.com/auth
  })
  .end(function(err, res) {
    // 
  });
