const express = require("express");
const router = express.Router();
const { songController } = require("../controllers");

const { postSong, getAllSongs, updateSong } = songController;

router
    .get("/all", getAllSongs)
    .post("/post", postSong)
    .patch("/update/:idSong", updateSong)

module.exports = router;