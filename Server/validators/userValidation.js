const Joi = require('joi');

const validateSignup = (userDetails) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        userName: Joi.string().min(6).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    })
    return schema.validate(userDetails)
}
const validateLogin = (user) => {
    const schema = Joi.object({
        userName: Joi.string().min(6).required(),
        password: Joi.string().min(6).required(),
    })
    return schema.validate(user)
}
module.exports = {validateSignup,validateLogin}