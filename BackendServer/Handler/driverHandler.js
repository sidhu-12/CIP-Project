(function(){

    
    var driver = require("../models/Driver");
    //var parent1=require("../Models/Parent")
    
    module.exports.updateLocation = function(req,res){
        
    driver.updateOne({mobileNumber:req.body.mobileNumber},{ $set:{location:{
        latitude:req.body.latitude,
        longitude:req.body.longitude,
    } }},function(err,data)
    {
        if(err)
        {
            throw err;
        }
        console.log("Location Updated  "+new Date());
            var updateLocation={
                responseMessage:"Location Updated",
            };
            res.send(updateLocation);
    })

            
    
        
    }
    module.exports.sendLocation=function(req,res)
    {
        driver.find({mobileNumber:req.body.mobileNumber},function(err,data)
        {
            if(err)
            {
                throw err;
            }
            console.log(data[0].location.latitude+data[0].location.longitude)
            res.json({latitude:data[0].location.latitude,longitude:data[0].location.longitude})
        }
        )
    }
    module.exports.getList=function(req,res)
    {
        const detail={
          password:false,
          tripTime:false,
          location:false,
          listOfStudents:false,
        }
        driver.find({schoolName:req.body.schoolName},detail,function(err,data)
        {
                if(err)
                {
                    throw err;
                }
                console.log(data);
                res.json(data);
        }
        )
    }
    module.exports.loginApi=function(req,res){
        driver.find({mobileNumber:req.body.username},(err,data)=>{
            if(err)
            {
                throw err;
            }
            if(data.length>0&&data[0].password==req.body.password)
            {
                console.log(data[0].password);
                console.log("Login Successfully");
                res.json({
                    responseMessage:"Login Successfully",
                })
            }
            else{
                console.log(data);
                res.json({
                    responseMessage:"Login Unsucessful Please try again",
                    
                });
            }
        })
    }
    module.exports.getDetails=function(req,res)
    {const detail={
        password:false,
       
      }
        driver.find({mobileNumber:req.body.mobileNumber},detail,(err,data)=>{
            if(err)
            {
                throw err;
            }
            console.log(data);
            res.json(data[0]);
        })
    }
    module.exports.register=function(req,res){
        driver.updateOne({mobileNumber:req.body.mobileNumber},{$push:{
            listOfStudents:{
                mobileNumber:req.body.parentMobileNumber,
                tripTime:req.body.tripTime,
                attendance:true,
            }
        }},(err,data)=>{
            if(err)
            {
                throw err;
            }
           res.json({
               responseMessage:"Successfully Registered",
           })
        
    }
        )
}
module.exports.updateAttendance=function(req,res){
    //console.log(req.body.mobileNumber+" "+req.body.driverMobileNumber);
    driver.updateOne({mobileNumber:req.body.driverMobileNumber,"listOfStudents.mobileNumber":req.body.mobileNumber},{$set:{
        "listOfStudents.$.attendance":req.body.attendance,
    }},(err,data)=>{
        if(err)
        {
            throw err;
        }
        console.log("Updated");
        res.json({
            responseMessage:"Updated Successfully",
        })
    })
}
    
    
    
    })();
    