const asyncHandler= require("express-async-handler");
const jwt=require("jsonwebtoken");

const validateToken= asyncHandler(async (req,res,next)=>{
    let token;
    let authHeader =req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token =authHeader.split(" ")[1];
    //     try {
    //         // Verify the token
    //         const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    //         req.user = decoded.user; // Attach the user info to the request
    //         next(); // Proceed to the next middleware or route handler

    //     } catch (err) {
    //         console.error("JWT Error:", err.message);

    //         if (err.name === "TokenExpiredError") {
    //             res.status(401);
    //             throw new Error("Token expired, please log in again");
    //         } else {
    //             res.status(401);
    //             throw new Error("User is not authorized, token is invalid or expired");
    //         }
    //     }
    // } else {
    //     res.status(401);
    //     throw new Error("User is not authorized or token is missing");
    // }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
            if(err){ // either wrong token or time is expired 
                console.error("JWT Error:", err.message); // Log the exact error
                res.status(401);
                throw new Error("User is not authorized, token is invalid or expired");
            }
            //console.log(decoded);
            // {
            //     user: {
            //       username: 'omi',
            //       email: 'tyagiomdeep@gmail.com',
            //       _id: '67af8cf660e1278a910b64ec'
            //     },
            //     iat: 1739560033,
            //     exp: 1739560633
            //   }
            req.user = decoded.user;//stored user info in req.user
            next();
        });
    } 
    else{
            res.status(401);
            throw new Error("User is not authorized or token is missing");
        }
} );


module.exports= validateToken;