const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcryptjs = require("bcryptjs");
const mongoosePaginate = require("mongoose-paginate-v2");


const userSchema = new Schema(
    {
        name:{
            type:String,
        },
        email:{
            type:String,
        },
        password:{
            type:String,
        },
        uploadImg:{
            type:String,
        }
    }
);

userSchema.plugin(mongoosePaginate);

userSchema.pre("save", async function (next) {
    try {
        this.password = await bcryptjs.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
 });
module.exports = mongoose.model("User",userSchema);

// User.paginate().then({});