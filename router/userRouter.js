const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const validator = require("../utils/validateRequest");
const passport = require("passport");
const upload = require('../config/multer');


const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../middleware/auth");

router.get("/register", checkNotAuthenticated, userController.userRegister);
router.post(
  "/register",
  checkNotAuthenticated,
  upload.single('file'),
  validator("RegisterUser"),
  userController.register
);
router.get("/login", checkNotAuthenticated, userController.userLogin);
router.post(
  "/login",
  checkNotAuthenticated,
  validator("loginUser"),
  passport.authenticate("local", {
     failureFlash: true,
     failureRedirect: "/login",
     successMessage: true,
    successRedirect: "/dashbord"
  })
);

router.get("/getData", checkAuthenticated, userController.getData);
router.get("/dashbord", checkAuthenticated, userController.dashbord);

router.get("/update/:id", checkAuthenticated, userController.edit);
router.post("/userEdit", checkAuthenticated, userController.UserEdit);
router.get("/delete/:id", checkAuthenticated, userController.deleteUser);

router.get("/logout", checkAuthenticated, userController.logout);
router.get("/getPaginate",userController.getPaginateUser);

module.exports = router;
