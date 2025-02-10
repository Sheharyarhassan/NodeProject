const {validateUserUpdate,validateLogin,validateSignup,validateUsertype,validatePassword} = require('../validators/userValidation');
const {Signup,userType} = require('../models/userModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (userId, expiresIn) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn });
};
const addUserType = async (req, res) => {
    const {error} = validateUsertype(req.body);
    if(error) return res.status(400).send("Error:" + error);
    try{
        const newUserType = new userType({
            name: req.body.name
        })
        await newUserType.save();
        res.status(201).send("User Type Added Successfully");
    }
    catch(err){
       res.status(500).send("Error:" + err);
    }
}
const getAllUserTypes = async (req, res) => {
    try{
        const userTypes = await userType.find()
        return res.status(200).send(userTypes);
    }
    catch(err){
        res.status(500).send("Error:" + err);
    }
}
const getAllActiveTypes = async (req, res) => {
    try{
        const userTypes = await userType.find({validFlag: true})
        return res.status(200).send(userTypes);
    }
    catch(err){
        res.status(500).send("Error:" + err);
    }
}
const updateUserType = async (req, res) => {
    if(!req.params.id) return res.status(400).send("Error: id required");
    const {error} = validateUsertype(req.body);
    if(error) return res.status(400).send("Error:" + error);
    try{
        const updatedUserType = await userType.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true,runValidators:true})
        if(!updatedUserType){
            return res.status(404).send("Error: User Type Not Found");
        }
        res.status(200).send("User Type Updated Successfully");
    }
    catch(err){
        res.status(500).send("Error:" + err);
    }
}
const ActivateUserType = async (req, res) => {
    if(!req.params.id) return res.status(400).send("Error: id required");
    try {
        const userTypeStatus = await userType.findByIdAndUpdate(req.params.id,{validFlag: true})
        if(!userTypeStatus){
            res.status(404).send("Error: User Type Not Found");
        }
        res.status(200).send("User Type Activated");
    }
    catch(err){
        res.status(500).send("Error:" + err);
    }
}
const DeactivateUserType = async (req, res) => {
    if(!req.params.id) return res.status(400).send("Error: id required");
    try {
        const userTypeStatus = await userType.findByIdAndUpdate(req.params.id,{validFlag: false})
        if(!userTypeStatus){
            res.status(404).send("Error: User Type Not Found");
        }
        res.status(200).send("User Type Deactivated");
    }
    catch(err){
        res.status(500).send("Error:" + err);
    }
}
const userLogin = async (req,res) => {
    const {error} = validateLogin(req.body);
    if (error) return res.status(400).send('Error: ' + error) 
    try{
        const checkUser = await Signup.findOne({userName:req.body.userName});
        if(!checkUser){
            return res.status(404).send("Error: User not found")
        }
        const passwordMatched = await bcrypt.compare(req.body.password,checkUser.password)
        if(!passwordMatched) {
            return res.status(401).send("Error: Password is not Correct");
        }
        const accessToken = generateToken(checkUser._id, '1h');
        checkUser.lastActive = new Date();
        await checkUser.save();
        res.json({ accessToken});
    }
    catch(err){
        res.status(500).send('Error: ' + err)
    }
}
const userSignup = async(req,res) =>{
    const {error} = validateSignup(req.body);
    if(error) return res.status(400).send('Error: ' + error)
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new Signup({
            name: req.body.name,
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword,
            userType:req.body.userType,
        })
        await newUser.save();
        res.status(201).send('User Created Successfully');
    }

    catch(err){
        res.status(500).send("Error: " + err)
    }
}
const userUpdate = async(req,res) =>{
    if(!req.params.id) return res.status(400).send("Error: id required");
    const {error} = validateUserUpdate(req.body);
    if(error) return res.status(400).send('Error: ' + error)
    try{
        const newUser = await Signup.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true,runValidators:true})
        if(!newUser){
            return res.status(404).send("Error: User Type Not Found");
        }
        res.status(200).send('User Updated Successfully');
    }

    catch(err){
        res.status(500).send("Error: " + err)
    }
}
const changePassword = async(req,res)=>{
    const {error} = validatePassword(req.body);
    if(error) return res.status(400).send('Error: ' + error)
    try {
        const user = await Signup.findOne({userName: req.body.userName})
        if(!user){
            return res.status(404).send("Error: User Not Found");
        }
        const passwordMatch = await bcrypt.compare(req.body.oldPassword,user.password);
        if(!passwordMatch){
            return res.status(401).send("Error: Old Password is not Correct");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(req.body.newPassword, salt);
        const updatedPassword = await Signup.findOneAndUpdate({userName:req.body.userName},{password:hashedpassword},{new:true})
        if(!updatedPassword){
            return res.status(400).send("Error: Password not updated");
        }
        res.status(200).send('Password Updated Successfully');
    }
    catch (err){
        res.status(500).send("Error: " + err)
    }
}
const getAllUsers = async(req,res) =>{
    try{
        const users = await Signup.find().populate('userType', 'name');
        res.status(201).send(users);
    }
    catch(err){
        res.status(500).send("Error: " + err)
    }
}

module.exports = {changePassword,userUpdate,userLogin,userSignup,getAllUsers,addUserType,updateUserType,getAllUserTypes,getAllActiveTypes,ActivateUserType,DeactivateUserType}