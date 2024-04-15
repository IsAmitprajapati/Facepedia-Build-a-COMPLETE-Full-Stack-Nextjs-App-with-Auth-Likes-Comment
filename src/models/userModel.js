import mongoose from "mongoose";

const userSchema = mongoose.Schema({
   firstName : {
        type : String,
        min : 3,
        max : 100,
        required : [true, "Provide first name"]
   },
   lastName : {
        type : String,
        min : 3,
        max : 100,
        required : [true, "Provide last name"]
   },
   location : {
        type : String,
        default : ""
   },
   occupation : {
        type : String,
        default : ""
   },
   email : {
        type : String,
        unique : true,
        required : [true, "Provide email id"]
   },
   password : {
        type : String,
        required : [true, "provide password"]
   },
   profile_pic : {
        type : String,
        default : ""
   },
   profileViews : {
        type : Number,
        min : 0,
        default : 0
   },
   profileImpressions : {
        type : Number,
        min : 0,
        default : 0
   },
   friends : {
     type : Array,
     default : []
   }
},{
    timeStamps : true
})


const userModel = mongoose.models.users ||  mongoose.model('users',userSchema)


export default userModel