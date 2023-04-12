const User = require("../model/userModel");


 function checkAuthenticated(req, res, next) {
     if (req.isAuthenticated()) {
         return next()
     }
     return res.redirect('/login');
 };

 function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/dashbord')
    }
    return next();
};


module.exports = {
    checkAuthenticated,
    checkNotAuthenticated
};