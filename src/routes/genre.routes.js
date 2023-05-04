const express = require("express");
const router = express.Router();
const { genreController } = require("../controllers");

// Import required controllers from the genreController
const {
  getAllGenres,
  getGenreById,
  createGenre,
  updateGenreById,
  deleteGenreById,
  getGenreByTitle
} = genreController;

// Define your routes here
router.get("/all", getAllGenres);
router.get("/id/:id", getGenreById);
router.get("/title/:title", getGenreByTitle)
router.post("/create", createGenre);
router.put("/update/:id", updateGenreById);
router.delete("/delete/:id", deleteGenreById);

module.exports = router;
