const express = require("express");
const router = express.Router();
const { songController } = require("../controllers");

const { postSong } = songController;

router
    .get("/all", () => {
        console.log("hola")
    })
    .post("/post", postSong)


module.exports = router;