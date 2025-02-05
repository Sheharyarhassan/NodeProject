const {genreValidation} = require('../validators/genreValidation');
const {Genre} = require("../models/booksModels");

const addGenre = async(req, res) => {
   const {error} = genreValidation(req.body);
   if(error) return res.status(400).send("Error:", error)

   try {
      const newGenre = new Genre({
         name: req.body.name,
         validFlag: true,
      })
      await newGenre.save()
      res.status(201).send("Book Added Successfully")
   }
   catch(err) {
      res.status(500).send('Error Adding Genre'+ err);
   }
}
const getGenreById = async(req, res) => {
   if(!req.params.id) return res.status(404).send("Not Found");
   try {
      const genreById = await Genre.findOne({_id: req.params.id});
      res.status(200).send(genreById)
   }
   catch(err) {
      res.status(500).send("Error:", err);
   }
}
const getAllGenres = async(req, res) => {
  try {
      const genres = await Genre.find();
      res.status(200).send(genres)
   }
   catch(err) {
      res.status(500).send("Error:", err);
   }
}
module.exports = {addGenre,getGenreById,getAllGenres}