var Stickshift = require('./src/index.js');
var cookie = require('cookie');
var config = require('./config');

Stickshift(
  document.getElementById('page'),
  {
    endpoint: 'http://localhost:' + config.port + '/query',
    branch: config.hubdb.branch,
    username: config.hubdb.username,
    access_token: config.hubdb.access_token || cookie.parse(document.cookie).access_token,
    repo: config.hubdb.repo
  });
