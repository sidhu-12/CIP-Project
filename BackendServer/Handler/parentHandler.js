(function(){

    
    var parent = require("../models/Parent");
    
    function handle(data,res){
    
        parent.create(data,function(err,data){
            if(err)
            {
                throw err;
            }
                console.log(data);           
                console.log("Successfully done");
                res.json({responseMessage:"Successfully Registered"});

            
            
        });
    
    }
    module.exports.getStudentList=function(req,res)
    {
        const detail={
            studentName:true,
            locationLatitude:true,
            locationLongitude:true,
            expoToken:true,
            mobileNumber:true,
            
          }
        parent.find({mobileNumber:{$in:req.body.mobileNumberList}},detail,(err,data)=>{
            if(err)
            {
                throw err;
            }
            console.log(data);
            res.json(data);

        })
    }
    module.exports.updateDriver=function(req,res){
        parent.updateOne({mobileNumber:req.body.mobileNumber},{$set:{
            driverMobileNumber:req.body.driverMobileNumber,
        }},(err,data)=>{
            if(err)
            {
                throw err;
            }
            console.log("Successfully done");
                res.json({responseMessage:"Successfully Registered"});
        })
    }
    module.exports.handleApi = function(req,res){
    
        var data = req.body;
        handle(data,res);
        
    }
    module.exports.loginApi=function(req,res){
        parent.find({mobileNumber:req.body.username},(err,data)=>{
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
                    parentName:data[0].parentName,
                    schoolName:data[0].schoolName,
                    driverMobileNumber:data[0].driverMobileNumber,
                })
            }
            else{
                res.json({
                    responseMessage:"Login Unsucessful Please try again"
                });
            }
        })
    }
    
    
    })();
    