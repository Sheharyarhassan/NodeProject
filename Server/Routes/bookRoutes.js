const express = require('express');
const {addBook,getAllBooks,getBookById,updateBook,ActivateBook,DeactivateBook} = require('../controller/bookController')
const router = express.Router();

router.post('/book/Add', addBook);

router.get('/book/GetAll', getAllBooks);

router.get('/book/GetById/:id', getBookById);

router.put('/book/Update/:id', updateBook);

router.put('/book/Activate/:id', ActivateBook);

router.put('/book/Deactivate/:id', DeactivateBook);

module.exports = router;
