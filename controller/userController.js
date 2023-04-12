const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
// const nodemailer = require("nodemailer");
// const sendgridTransport = require('nodemailer-sendgrid-transport');
const Record_per_page = 5;
const fileUploadPath = path.join(__dirname, "../public/upload");


// const transporter = nodemailer.createTransport(
  //   sendgridTransport({
    //     auth: {
      //       api_key:
      //         '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'
//     }
//   })
// );



exports.register = async (req, res) => {
  try {
    // const files = req.file;
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      uploadImg : req.file.filename
    });

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      req.flash("error", "Email already exists");
      return res.redirect("/register");
    }

    await newUser.save();

    req.flash("message", "User Register Successfully");
    res.redirect("/login");
    // return transporter.sendMail({
    //   to: email,
    //   from: 'brijesh513@gmail.com',
    //   subject: 'Register succeeded!',
    //   html: '<h1>You successfully register !</h1>'
    // });
  } catch (error) {
    res.render("error500");
  }
};

exports.userRegister = async (req, res) => {
  const error = req.flash("error");

  res.render("register", { errors: error });
};

exports.login = async (req, res) => {
  try {

    const userExisting = await User.findOne({ email: req.body.email });
    if (!userExisting) {
      req.flash("error", "User not found");
      return res.redirect("/login");
    }

    const valid = await bcryptjs.compare(
      req.body.password,
      userExisting.password
    );
    if (!valid) {
      req.flash("error", "Invalid Password");
      return res.redirect("/login");
    }

    req.flash("message", "User Login Successfully");
    res.redirect("/dashbord/?page=current");
  } catch (error) {
    req.flash("error", "An error occurred");
    res.redirect("/login");
  }
};

exports.userLogin = async (req, res) => {
  const message = req.flash("message");
  const error = req.flash("error");

  res.render("login", { messages: message, errors: error });
};

exports.getData = async (req, res) => {
  try {
    // const limit = 5
    const user = await User.find();

    user.map((user) => {
      return {
        name: user.name,
        email: user.email,
        uploadImg : user.uploadImg

      };
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.dashbord = async (req, res) => {
  
  const page = +req.query.page || 1
  let totalData;

  const users = await User.find()
  .count()
  .then(numUsers =>{
    totalData = numUsers;
    return User.find()
    .limit(Record_per_page)
    .skip((page - 1) * Record_per_page);
  })

  const message = req.flash("message");
  const alert = req.flash("alert");

    res.render("dashbord",{
      user:users,
      pageTitle:"Dashbord",
      path:"/",
      currentPage: page,
      hasNextPage:Record_per_page * page < totalData,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalData / Record_per_page),
      users, messages: message, alerts: alert
    });
  

  // const message = req.flash("message");
  // const alert = req.flash("alert");

  // res.render("dashbord", { users, messages: message, alerts: alert });
};

const clearImage = fileUploadPath =>{
  fileUploadPath = path.join(__dirname,'_', fileUploadPath);
}

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    await User.findByIdAndDelete(id);

    req.flash("alert", "User Deleted Successfully");
    res.redirect("/dashbord");
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.edit = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findOne({ _id: id });

    res.render("updateUser", {
      users: user,
    });
  } catch (e) {
    const error = new Error("internal server Error");
    error.statusCode = 500;
    throw error;
  }
};

exports.UserEdit = async (req, res) => {
  try {
    const id = req.body.id;

    await User.findByIdAndUpdate(id, {
      name: req.body.name,
      email: req.body.email,
    });

    req.flash("message", "User Updated Successfully");
    res.redirect("/dashbord");
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  req.session.destroy();

  res.redirect("/login");
};

// const getPagination = (page, size)=>{
//   const limit = size ? +size:5;
//   const offset = page ? page*limit : 0;

//    return{limit,offset};
// };

// exports.getPaginateUser = async(req, res) => {
//   try {
//     const {page, size} = req.query;
//     const {limit, offset} = getPagination(page, size);
  
//     const users = await User.paginate({},{offset, limit});

//     if(!users){
//       return res.status(404).json({
//         success:false,
//         message:"Users not found"
//       });
//     }else{
//       return res.status(200).json({
//         success:true,
//         data:users,
//       });
//       // return res.send(vardata)
//     };
//   } catch (error) {
//     return res.json(error)
//   };
// };

