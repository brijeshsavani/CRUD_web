require("dotenv").config();
require("./config/db");

const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const passport = require('passport');
const router = require("./router/index");
const path = require("path");
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');


require('./config/passport')(passport);

app.use(express.urlencoded({ extended: false, limit: "50mb" }));

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,'views'));



const store = MongoStore.create({
    mongoUrl: "mongodb://localhost:27017/Users",
    ttl: 1000 * 60 * 60 * 24,
    crypto: {
        secret: 'squirrel'
      }
  });

app.use(cookieParser());
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: process.env.SECRET_KEY,
    saveUninitialized:false,
    resave: false, 
    store:store,
    cookie: { 
        maxAge: oneDay,
        httpOnly: true,
        secure: false,
    }
}));

app.use(express.static('public'))
app.use('/public', express.static('public'))

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use("/", router);

app.listen(3000,()=>{
    console.log("server is runing on port:" +3000);
});
