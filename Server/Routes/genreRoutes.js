const express = require("express");
const {addGenre,getGenreById,getAllGenres,updateGenre,ActivateGenre,DeactivateGenre,getActiveGenres} = require("../controller/genreController");
const router = express.Router();

router.post('/genre/Add', addGenre);
router.get('/genre/getById/:id', getGenreById);
router.get('/genre/getAll', getAllGenres);
router.get('/genre/getAllActive', getActiveGenres);
router.put('/genre/Update/:id', updateGenre);
router.patch('/book/Activate/:id', ActivateGenre);
router.patch('/book/Deactivate/:id', DeactivateGenre);

module.exports = router;