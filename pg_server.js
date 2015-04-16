var pg = require('pg');

var config = require('./config')

var conString = "postgres://" + config.pg.user + ":" + config.pg.password + "@" + config.pg.ip + "/" + config.pg.db_name;

var http = require('http');
var concat = require('concat-stream');
var st = require('st');

var mount = st({ path: __dirname, url: '/', cache: false });

var server = http.createServer(function(req, res) {
  var stHandled = mount(req, res);
  if (!stHandled) {
    req.pipe(concat(function(query) {
      try {
        // get a pg client from the connection pool
        pg.connect(conString, function(err, client, done) {

          var handleError = function(err) {
            // no error occurred, continue with the request
            if(!err) return false;

            // An error occurred, remove the client from the connection pool.
            // A truthy value passed to done will remove the connection from the pool
            // instead of simply returning it to be reused.
            // In this case, if we have successfully received a client (truthy)
            // then it will be removed from the pool.
            console.log(err);
            done(client);
            res.writeHead(500, {'content-type': 'text/plain'});
            res.end(JSON.stringify(err));
            return true;
          };

          if (handleError(err)) return;

          var q = JSON.parse(query);
          console.log(q);
          
          client.query(q.query, function(err, result) {
            if(handleError(err)) return;
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(err || result.rows));
          });
        });
      } catch(e) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('error');
      }
    }));
  }
});

server.listen(config.port, function(err, res) {
  console.log('listening on port ' + config.port);
});
