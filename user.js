//user.js
var datahandler=require('./datahandler.js');
var database=require('./database.js');

//获取指定坐标范围内精灵坐标
function getSpriteLocation (req,res,next) {

  console.log('getCoordinates');
  var longtitude=req.params.longtitude;
  var latitude=req.params.latitude;
  var radius=req.params.radius;


  console.log(longtitude+'_'+latitude+'_'+radius);
  var conn=database.connectDB();

  conn.query('SELECT * FROM sprite_coordinate WHERE exist=1',function(err,results,fields){
    if(err){
      console.log('err='+err);
      datahandler.sendFailed(res,'select sprites coordinate failed');
    }else{
      var resultList = [];
      for (var index in results){
        var result=results[index];

        var distance=calculateDistanse(result,longtitude,latitude);
        console.log('distance:'+distance);
        if (distance<radius){
          resultList.push(result);
        }
      }

      datahandler.sendSuccess(res,{
        'list':resultList
      });
    }
    database.closeDB(conn);
  });
}

//根据亮点经纬度计算距离
function calculateDistanse(start,endLongtitude,endLatitude){
  var startLongtitude = start.longtitude;
  var startLatitude = start.latitude;

  var radLatitude1 = startLatitude*Math.PI/180;
  var radLatitude2 = endLatitude*Math.PI/180;
  var a = Math.abs(radLatitude1-radLatitude2);
  var b = Math.abs(startLongtitude*Math.PI/180-endLongtitude*Math.PI/180);

  var earthRadius = 6378.137;
  var metre = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2)+Math.cos(radLatitude1)*Math.cos(radLatitude2)*Math.pow(Math.sin(b/2),2)))*earthRadius;
  return Math.round(metre*100);
}

//标记指定id精灵为已获取
function setSpriteExist(req,res,next){
  console.log('set sprite exist');
  
  var sprite_id=req.params.id;

  var conn=database.connectDB();
  conn.query('UPDATE sprite_coordinate SET exist=0 WHERE exist=1 AND id=?',sprite_id,function(err,result){
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

