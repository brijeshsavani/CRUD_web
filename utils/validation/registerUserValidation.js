const joi = require("joi");

const RegisterUserSchema = joi.object({
    name: joi.string().empty().min(2).max(30).required().trim().message({
        "string.empty":"Name Must Be Required",
        "string.min":"Name Must Be least 2 charecters",
        "any.required":"Name Must Be Required"
    }),
    email: joi.string().empty().email().required().trim().message({
        "string.empty":"Email Adress Must Be Required",
        "string.emil":"Invalid Email Adress",
        "any.required":"Email Adress Must Be Required"
    }),
    password: joi.string().empty().min(6).required().trim().message({
        "string.empty": "password must be required",
        "string.min": "password must be least 6 charecters",
        "any.required": "password must be required"
    })
});

module.exports = RegisterUserSchema;