var mongoose = require('mongoose');
var dummies = mongoose.Schema({
    mobileNumber:{type:Number,required:true,unique:true},
    driverName:String,
    password:{type:String,required:true},
    vanName:String,
    vanNumber:String,
    listOfStudents:[{
        mobileNumber:Number,
        tripTime:{
            morning:String,
            evening:String
        },
        attendance:Boolean,
    }],
    location:{
        latitude:Number,
        longitude:Number
    },
    schoolName:String,
},
{
    collection:"Driver"
});
module.exports = mongoose.model('Driver',dummies);