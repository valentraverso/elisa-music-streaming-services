const express = require("express");
const router = express.Router();
const { playlistController } = require("../controllers");
const { verifyRequester } = require("../middlewares/verifyRequester");

const { getAllPlaylist, postPlaylist, getById, updatePlaylist, deletePlaylist, getByTitle, getByOwner, updateLikeSong, updateDislikeSongs } = playlistController;

router
    .get("/all", getAllPlaylist)
    .get("/id/:id", getById)
    .get("/title", getByTitle)
    .get("/owner/:idOwner", getByOwner)
    .post("/create", postPlaylist)
    .patch("/update/id", updatePlaylist)
    .patch("/update/likes/:id", verifyRequester, updateLikeSong)
    .patch("/update/dislikes/:id", verifyRequester, updateDislikeSongs)
    .delete("/delete/:id", deletePlaylist);

module.exports = router;