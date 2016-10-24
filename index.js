var restify = require('restify');

var server=restify.createServer({
  name:'maphunterserver'
});
server.listen(8080);
server.use(restify.throttle({
  burst:10,
  rate:5,
  ip:true
}));

server.use(restify.acceptParser(server.acceptParser));
server.use(restify.queryParser());
server.use(restify.gzipResponse());
server.use(restify.bodyParser());
server.use(restify.jsonp());
