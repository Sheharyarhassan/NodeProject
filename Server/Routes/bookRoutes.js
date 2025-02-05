const express = require('express');
const {addBook,getAllBooks,getBookById,updateBook,ActivateBook,DeactivateBook,getActiveBooks} = require('../controller/bookController')
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/book/Add',authMiddleware, addBook);

router.get('/book/GetAll',authMiddleware, getAllBooks);

router.get('/book/getAllActive', getActiveBooks);

router.get('/book/GetById/:id', getBookById);

router.put('/book/Update/:id',authMiddleware, updateBook);

router.patch('/book/Activate/:id',authMiddleware, ActivateBook);

router.patch('/book/Deactivate/:id',authMiddleware, DeactivateBook);

module.exports = router;
