const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
    name:{type:'String',required:true},
    userName:{type:'String',required:true,unique:true},
    password:{type:'String',required:true},
    email:{type:'String',required:true,unique:true}
})
const loginSchema = new mongoose.Schema({
    userName:{type:'String',required:true},
    password:{type:'String',required:true},
})
module.exports = {
    Signup: mongoose.model('Signup', signupSchema),
    Login: mongoose.model('Login', loginSchema)
};