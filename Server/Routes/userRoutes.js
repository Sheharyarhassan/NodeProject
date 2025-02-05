const express = require('express');
const router = express.Router()
const {userLogin,userSignup} = require('../controller/userController')

router.post('/login',userLogin);

router.post('/Signup',userSignup);

module.exports = router
