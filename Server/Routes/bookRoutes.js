const express = require('express');
const {addBook,getAllBooks,getBookById,updateBook,ActivateBook,DeactivateBook,getActiveBooks} = require('../controller/bookController')
const router = express.Router();

router.post('/book/Add', addBook);

router.get('/book/GetAll', getAllBooks);

router.get('/book/getAllActive', getActiveBooks);

router.get('/book/GetById/:id', getBookById);

router.put('/book/Update/:id', updateBook);

router.patch('/book/Activate/:id', ActivateBook);

router.patch('/book/Deactivate/:id', DeactivateBook);

module.exports = router;
