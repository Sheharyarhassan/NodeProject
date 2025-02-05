const express = require('express');
const router = express.Router()
const {userLogin,userSignup,getAllUsers} = require('../controller/userController')
const authMiddleware = require('../middleware/authMiddleware');
router.post('/login',userLogin);

router.post('/Signup',userSignup);

router.get('/users/getAll',authMiddleware,getAllUsers);

module.exports = router
