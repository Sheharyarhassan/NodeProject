const {bookValidation} = require('../validators/bookValidation');
const {Book} = require('../models/booksModels');

const addBook = async (req,res) => {
    const {error} = bookValidation(req.body);
    if (error) return res.status(400).send('Error' + error);

    try{
        const BookObject = new Book({
            title:req.body.title,
            author:req.body.author,
            publishedYear:req.body.publishedYear,
            genre: req.body.genre,
            validFlag: true
        });
        await BookObject.save();
        res.status(201).send("Book Added SuccessFully")
    }
    catch(err){
        res.status(500).send("Error" + err)
    }
}
const getBookById = async(req,res) =>{
    if(!req.params.id){
       return res.status(400).send('Enter an id')
    }
    try{
        const bookById = await Book.findOne({_id:req.params.id}).populate('genre',"name");
        if(!bookById){
            return res.status(404).send('Book not Found');
        }
        res.status(200).send(bookById)
    }
    catch(err){
        res.status(500).send('Error:' + err)
    }
}
const getAllBooks = async(req,res) =>{
    try{
        const books = await Book.find().populate('genre',"name");
        res.status(200).send(books)
    }
    catch(err){
        res.status(500).send('Error' + err);
    }
}
const getActiveBooks = async(req,res) =>{
    try{
        const books = await Book.find({validFlag: true}).populate('genre',"name");
        res.status(200).send(books)
    }
    catch(err){
        res.status(500).send('Error' + err);
    }
}
const updateBook = async(req,res) =>{
    if(!req.params.id){
        return res.status(400).send('Id not found');
    }
    const {error} = bookValidation(req.body);
    if(error) return res.status(400).send("Error: " + error);
    try{
        const updatedBook = await Book.findByIdAndUpdate(
           req.params.id,
           req.body,
           { new: true, runValidators: true }
        )
        if (!updatedBook) {
            return res.status(404).send('Book not found');
        }
        res.status(200).send("Book Updated SuccessFully");
    }
    catch (err) {
        res.status(500).send('Error updating book'+ err);
    }
}
const ActivateBook = async(req,res) =>{
    if(!req.params.id){
        return res.status(400).send('Id not found');
    }
    try{
        const updatedBook = await Book.findByIdAndUpdate(req.params.id,{validFlag:true} , { new: true })
        if (!updatedBook) {
            return res.status(404).send('Book not found');
        }
        res.status(200).send("Book Activated");
    }
    catch (err) {
        res.status(500).send('Error updating book'+ err);
    }
}
const DeactivateBook = async(req,res) =>{
    if(!req.params.id){
        return res.status(400).send('Id not found');
    }
    try{
        const updatedBook = await Book.findByIdAndUpdate(req.params.id,{validFlag:false} , { new: true })
        if (!updatedBook) {
            return res.status(404).send('Book not found');
        }
        res.status(200).send("Book Deactivated");
    }
    catch (err) {
        res.status(500).send('Error updating book'+ err);
    }
}

module.exports = {getAllBooks,getBookById,addBook,updateBook,ActivateBook,DeactivateBook,getActiveBooks}