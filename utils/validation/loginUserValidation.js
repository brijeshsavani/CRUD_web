const joi = require("joi");


const loginUserSchema = joi.object({
    email: joi.string().empty().required().email().trim().message({
        "string.empty": "email must be required",
        "string.email": "email must be required",
        "any.required": "Invalid email address"
    }),
    password: joi.string().empty().min(6).required().trim().message({
        "string.empty": "password must be required",
        "string.min": "password must be least 6 charecters",
        "any.required": "password must be required"
    })
});

module.exports = loginUserSchema