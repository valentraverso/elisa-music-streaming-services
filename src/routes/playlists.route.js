const express = require("express");
const router = express.Router();
const { playlistController } = require("../controllers");

const { getAllPlaylist, createPlaylist, getById, updatePlaylist, deletePlaylist, getByTitle } = playlistController;

router
    .get("/all", getAllPlaylist)
    .get("/id/:id", getById)
    .get("/title", getByTitle)
    .post("/create", createPlaylist)
    .patch("/update/id", updatePlaylist)
    .delete("/delete/:id", deletePlaylist)

module.exports = router;
