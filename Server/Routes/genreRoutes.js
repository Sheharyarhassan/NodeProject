const express = require("express");
const {addGenre,getGenreById,getAllGenres,updateGenre,ActivateGenre,DeactivateGenre,getActiveGenres} = require("../controller/genreController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post('/genre/Add',authMiddleware, addGenre);
router.get('/genre/getById/:id', getGenreById);
router.get('/genre/getAll',authMiddleware, getAllGenres);
router.get('/genre/getAllActive', getActiveGenres);
router.put('/genre/Update/:id',authMiddleware, updateGenre);
router.patch('/book/Activate/:id',authMiddleware, ActivateGenre);
router.patch('/book/Deactivate/:id',authMiddleware, DeactivateGenre);

module.exports = router;