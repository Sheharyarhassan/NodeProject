const express = require("express");
const {addGenre,getGenreById,getAllGenres} = require("../controller/genreController");
const router = express.Router();

router.post('/genre/Add', addGenre);
router.get('/genre/getById/:id', getGenreById);
router.get('/genre/getAll', getAllGenres);

module.exports = router;