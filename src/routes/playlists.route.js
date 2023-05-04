const express = require("express");
const router = express.Router();
const { playlistController } = require("../controllers");

const { getAllPlaylist, createPlaylist, getPlaylistById, updatePlaylist, deletePlaylist } = playlistController;

router
    .get("/all", getAllPlaylist)
    .get("/id/:id", getPlaylistById)
    .post("/create", createPlaylist)
    .patch("/update/id", updatePlaylist)
    .delete("/delete/:id", deletePlaylist)

module.exports = router;
