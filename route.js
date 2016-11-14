function route(server,url_map){
  for (var name in url_map){
    config=url_map[name];
    path=config.path;
    method = config.method;
    respond = config.respond;
		server[method](path, respond);
    console.log(respond);
	}
  console.log('route complete');
}

module.exports={
  route:route
};
