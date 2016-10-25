//user.js
var datahandler=require('./datahandler.js');
var database=require('./database.js');

//获取指定坐标范围内精灵坐标
function getSpriteLocation (req,res,next) {

  console.log('getCoordinates');
  var longitude=req.params.longitude;
  var latitude=req.params.latitude;
  var radius=req.params.radius;

  console.log(longitude+'_'+latitude+'_'+radius);
  var conn=database.connectDB();
  console.log('breadk');
  conn.query('SELECT * FROM sprite_coordinate WHERE longtitude > ? AND longtitude < ? AND latitude > ? AND latitude < ? AND exist=1',[longitude-radius,longitude+radius,latitude-radius,latitude+radius],function(err,results,fields){
    console.log('conn.query');
    if(err){
      console.log('err='+err);
      datahandler.sendFailed(res,'select sprites coordinate failed');
    }else{
      datahandler.sendSuccess(res,{
        'list':results
      });
    }
    datahandler.closeDB(conn);
  });
}

//标记指定id精灵为已获取
function setSpriteExist(req,res,next){
  
  var exist=req.params.exist;
  var sprite_id=req.params.id;

  var result_exist=0;

  var conn=database.connectDB();
  conn.query('UPDATE sprite_coordinate SET exist=? WHERE exist=1',result_exist,function(err,result){
    if(err){
      datahandler.sendFailed(res,'set sprite exist failed');
    }else{
      console.log(result);
      var rows=result.affectedRows;
      console.log('rowaffes='+rows+'\n');
      if (rows===1){
        datahandler.sendSuccess(res,{
          'code':200
        });
      }else{
        datahandler.sendSuccess(res,{
          'code':201
        });
      }
    }
    database.closeDB(conn);
  });
}


//output
module.exports={
  getSpriteLocation:getSpriteLocation,
  setSpriteExist:setSpriteExist
};
