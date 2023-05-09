const express = require("express");
const router = express.Router();
const { songController } = require("../controllers");

const { postSong, getAllSongs, updateSong, deleteSong, getByTitle, getById } = songController;

router
    .get("/all", getAllSongs)
    .get("/title/:songTitle", getByTitle)
    .get("/id/:idSong", getById)
    .post("/post", postSong)
    .patch("/update/:idSong", updateSong)
    .delete("/delete/:idSong", deleteSong);

module.exports = router;