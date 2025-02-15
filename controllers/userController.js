const asyncHandler= require("express-async-handler");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const User=require("../models/userModel");



//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser=asyncHandler(async(req,res)=>{
    const {username,email,password}=req.body;
    if(!username || !email || !password)
    {
        res.status(400);
        throw new Error("All fields are mandatory");
    }  
    
    const userAvailable=await User.findOne({email});  //checking user is already registered or not // pass email as object 
    if(userAvailable)  // as email is unique so that by it
    {
        res.status(400);
        throw new Error("User already registered");
    }
    // now user is not already registered so storing 

    //hash password
    const hashedPassword= await bcrypt.hash(password,10); //10 is salt round
    // creating user
    const user=await User.create({
        username,
        email,
        password:hashedPassword,

    });

    
    if(user){ // if user is successfully created
        res.status(201).json({_id: user._id,email:user.email});
    }
    else 
    {
        res.status(400);
        throw new Error("User data is not valid");
    }
   // res.json({message:"Register the user"});
});




//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password)
    {
        res.status(400);
        throw new Error("All fields are mandatory");
    } 

    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){ // firstly we are checking the user is there in db and its not undefined && then we are comparing the client password with db hashed password
        const accessToken= jwt.sign({
            user:{ // payload  //after verifying the token we will get this user info in decorded.user
                username:user.username,
                email: user.email,
                _id: user._id,
            },
        }, process.env.ACCESS_TOKEN_SECRET,
        { expiresIn:"10m"});// 10 Minute
        res.status(200).json({message:"Login sucessful" ,accessToken}); 
    }else{
        res.status(401)
        throw new Error("Email or password is not valid");

    }
   // res.json({message:"login user"});
});


//@desc Current user info
//@route POST /api/users/current
//@access private
const currentUser=asyncHandler(async(req,res)=>{
   // res.json({message:"Current user information"});
   res.json(req.user);
});

module.exports={registerUser,loginUser,currentUser};