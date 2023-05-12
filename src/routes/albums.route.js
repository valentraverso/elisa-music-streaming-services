const express = require("express");
const router = express.Router();
const { albumController } = require("../controllers");

const { getAllAlbum, createAlbum, updateAlbum, getById, deleteAlbum, getByTitle, deleteManyAlbums } = albumController;

router
    .get("/all", getAllAlbum)
    .get("/title/:title", getByTitle)
    .get("/id/:id", getById)
    .post("/create", createAlbum)
    .patch("/update/:id", updateAlbum)
    .delete("/delete/:id", deleteAlbum)
    .delete("/deletemany/", deleteManyAlbums)

module.exports = router;