const mongoose = require("mongoose");
require("dotenv").config();
const URL = "mongodb://localhost:27017/Users";

mongoose.connect(URL).then(()=>{
    console.log("DB connected successfully");
}).catch((error)=>{
    console.log(error);
});