var mongoose = require('mongoose');

var parentDetails = mongoose.Schema({
   parentName:String,
   studentName:String,
   mobileNumber:Number,
   locationLatitude:Number,
   locationLongitude:Number,
   schoolName:String,
   driverMobileNumber:Number,
   expoToken:Object,
   password:String,
},
{
    collection:"ParentDetails"
});
module.exports = mongoose.model('ParentDetails',parentDetails);