//index.js
var restify=require('restify');
var router=require('./route.js');
var user=require('./user.js');

var server=restify.createServer({
  name:'maphunterserver'
});
server.listen(8080);
server.use(restify.throttle({
  burst:10,
  rate:5,
  ip:true
}));

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.gzipResponse());
server.use(restify.bodyParser());
server.use(restify.jsonp());

router.route(server,{
  '获取精灵坐标':{
    'path':'/coordinates',
    'method':'post',
    'respond':user.getSpriteLocation
  },
  '标记精灵':{
    'path':'/marksprite',
    'method':'post',
    'respond':user.setSpriteExist
  }
});

server.get('/',function(req,res,next){
  console.log(req); 
  res.send('success');
  return next();

});
