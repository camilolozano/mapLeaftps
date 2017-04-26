// Install express js 'npm install express'
const path = require('path');
const express = require('express');
const compression = require('compression');
const app = express();
const helmet = require('helmet');
// Instruct the app
// middleware
app.use(helmet());
// If an incoming request uses
// a protocol other than HTTPS,
// redirect that request to the
// same url but with HTTPS
const HTTPS_ENABLED = process.env.HTTPS_ENABLED || false;
if (HTTPS_ENABLED === 'true') {
  const forceSSL = function () {
    return function (req, res, next) {
      if (process.env.NODE_ENV == 'production' && req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(['https: //', req.get('Host'), req.url].join(''));
      }
      next();
    }
  }
  // to use the forceSSL
  app.use(forceSSL());
}
app.use(compression());
// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));
// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});
// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080, ()=>{
  console.log('Server running')
});