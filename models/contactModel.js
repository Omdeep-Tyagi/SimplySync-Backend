const mongoose= require("mongoose");

const contactSchema=new mongoose.Schema({
    user_id:{ //for user who is creating the contact
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User",// using User model

    },
    name:{
        type:String,
        required:[true, "Please add the contact name"],
    },
    email:{
        type:String,
        required:[true, "Please add the contact email address"],
    },
    name:{
        type:String,
        required:[true, "Please add the contact phone number"],
    },
       
}, {
      timestamps:true,
   }
);

module.exports= mongoose.model("Contact",contactSchema);