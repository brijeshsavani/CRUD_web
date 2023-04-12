const multer = require("multer");
const path = require("path");
const fileUploadPath = path.join(__dirname, "../public/upload");

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "file/pdf") {
    return cb(null, true);
  }
  cb(null, false);

  cb(new Error("I don't have a clue!"));
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, fileUploadPath);
  },
  filename: function (req, file, cb) {
    //     const ext = file.mimetype.split("/")[1];
    //  cb(null, `${file.fieldname}-${Date.now()}.${ext}`);

    cb(null, Date.now() + "-" + file.originalname);

  },
});

module.exports = multer({ storage: storage, fileFilter });
