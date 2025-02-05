const {validateLogin} = require('../validators/userValidation');
const {validateSignup} = require('../validators/userValidation');
const {Signup} = require('../models/userModels');
const bcrypt = require('bcrypt');

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
        res.status(200).send("User Logged in")
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
            password: hashedPassword
        })
        await newUser.save();
        res.status(201).send('User Created Successfully');
    }

    catch(err){
        res.status(500).send("Error: " + err)
    }
}

module.exports = {userLogin,userSignup}