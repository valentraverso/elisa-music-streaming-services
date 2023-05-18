const express = require("express");
const router = express.Router();
const { albumController, songController } = require("../controllers");

const { getAllAlbum, createAlbum, updateAlbum, getById, deleteAlbum, getByTitle, deleteManyAlbums, getManyById } = albumController;
const { deleteSongsByAlbum } = songController;

router
    .get("/all", getAllAlbum)
    .get("/title/:title", getByTitle)
    .get("/id/:id", getById)
    .get("/id/many/:ids", getManyById)
    .post("/create", createAlbum)
    .patch("/update/:id", updateAlbum)
    .patch("/delete/:id", deleteAlbum, deleteSongsByAlbum)
    .delete("/delete/many/", deleteManyAlbums)

module.exports = router;