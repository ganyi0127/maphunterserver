var datahandler=require('./datahandler.js');
var database=require('./database.js');

function get_sprite_location (req,res,next) {

  var longitude=req.params.longitude;
  var latitude=req.params.latitude;

  var conn=database.connectDB();
  conn.query('SELECT * FROM sprites_info WHERE longitude < ? AND latitude < ?',longitude,latitude,function(err,results,fields){
    if(err){
      datahandler.sendFailed(res,'select sprites failed');
    }else{
      datahandler.sendSuccess(res,{
        'longitude':longitude,
        'latitude':latitude
      });
    }
  });
}

module.exports={
  getspritelocation:get_sprite_location
};
