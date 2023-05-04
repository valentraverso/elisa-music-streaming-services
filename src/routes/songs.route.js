const express = require("express");
const router = express.Router();
const { songController } = require("../controllers");

const { postSong, getAllSongs, updateSong, deleteSong } = songController;

router
    .get("/all", getAllSongs)
    .post("/post", postSong)
    .patch("/update/:idSong", updateSong)
    .delete("/delete/:idSong", deleteSong)

module.exports = router;