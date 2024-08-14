const express=require("express");
const app=express();
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv=require("dotenv").config();// load environment variables from .env file

connectDb();

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

const port=process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`server is listening to port ${port}`);
});



  
