(function(){

    var driver = require("./Handler/driverHandler");
    var parent=require("./Handler/parentHandler")
    
	module.exports = function(app){

        app.post("/locationUpdater",driver.updateLocation)
        app.post("/locationFetcher",driver.sendLocation)
        app.post("/register",parent.handleApi)
        app.post("/login",parent.loginApi)
         app.post("/loginDriver",driver.loginApi)
         app.post("/DriverList",driver.getList)
         app.post("/registerDriver",driver.register)
         app.post("/matchDriver",parent.updateDriver)
         app.post("/getDriverDetails",driver.getDetails)
         app.post("/updateAttendance",driver.updateAttendance)
         app.post("/getStudentList",parent.getStudentList)
	
	};


})();
