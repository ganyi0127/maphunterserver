function sendSuccess(res,result){
  res.send({
    'result':true,
    'data':result
  });
}

function sendFailed(res,result){
  res.send({
    'result':false,
    'reason':reason
  });
}

module.exports={
  sendSuccess:sendSuccess,
    sendFailed:sendFailed
};
