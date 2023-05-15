const express = require("express");
const router = express.Router();
const { albumController } = require("../controllers");

const { getAllAlbum, createAlbum, updateAlbum, getById, deleteAlbum, getByTitle, getManyById } = albumController;

router
    .get("/all", getAllAlbum)
    .get("/title/:title", getByTitle)
    .get("/id/:id", getById)
    .get("/id/many/:ids", getManyById)
    .post("/create", createAlbum)
    .patch("/update/:id", updateAlbum)
    .delete("/delete/:id", deleteAlbum)

module.exports = router;