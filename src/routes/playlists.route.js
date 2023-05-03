const express = require("express");
const router = express.Router();
const { playlistsController } = require("../controllers");

const { getAllPlaylists, createPlaylist, getPlaylistById, updatePlaylist, deletePlaylist } = playlistsController;

router
    .get("/all", getAllPlaylists)
    .get("/id/:id", getPlaylistById)
    .post("/create", createPlaylist)
    .patch("/update/id", updatePlaylist)
    .delete("/delete/:id", deletePlaylist)

module.exports = router;
