const mongoose= require("mongoose");

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true, "Please add the user name"],//if it is not given then express-async-handler will throw error to error handling middleware and we will send response to client caughtt by error handling middleware
    },
    email:{
        type:String,
        required:[true, "Please add the user email address"],
        unique:[true, "Email address already taken"],
    },
    password:{
        type:String,
        required:[true, "Please add the user password"],
    },
       
}, {
      timestamps:true,
   }
);

module.exports= mongoose.model("User",userSchema);