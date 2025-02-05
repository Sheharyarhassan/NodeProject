const Joi = require('joi');

const validateSignup = (userDetails) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        userName: Joi.string().min(6).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        userType: Joi.string().required(),
    })
    return schema.validate(userDetails)
}
const validateUserUpdate = (userDetails) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        userName: Joi.string().min(6).required(),
        email: Joi.string().email().required(),
        userType: Joi.string().required(),
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
const validateUsertype = (usertype) =>{
    const schema = Joi.object({
        name:Joi.string().min(3).required()
    })
    return schema.validate(usertype);
}
module.exports = {validateSignup,validateLogin,validateUsertype,validateUserUpdate}