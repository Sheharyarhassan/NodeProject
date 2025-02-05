const express = require('express');
const router = express.Router()
const {userUpdate,userLogin,userSignup,getAllUsers,addUserType,updateUserType,getAllUserTypes,getAllActiveTypes,ActivateUserType,DeactivateUserType} = require('../controller/userController')
const authMiddleware = require('../middleware/authMiddleware');
router.post('/login',userLogin);
router.post('/Signup',userSignup);
router.put('/user/Update/:id',authMiddleware,userUpdate);
router.get('/users/getAll',authMiddleware,getAllUsers);
router.post('/usertype/Add',authMiddleware,addUserType);
router.put('/usertype/Update/:id',authMiddleware,updateUserType);
router.get('/usertype/getAll',authMiddleware,getAllUserTypes);
router.get('/usertype/getAllActive',authMiddleware,getAllActiveTypes);
router.patch('/usertype/Activate/:id',authMiddleware,ActivateUserType);
router.patch('/usertype/Deactivate/:id',authMiddleware,DeactivateUserType);


module.exports = router
