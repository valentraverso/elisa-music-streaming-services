const express = require("express");
const router = express.Router();
const { albumController } = require("../controllers");

const { getAllAlbum, createAlbum, updateAlbum, getById, deleteAlbum } = albumController;

router.get("/all", getAllAlbum);
router.post("/create", createAlbum);
router.post("/update", updateAlbum);
router.get("/id/:id", getById);
router.delete("/delete/:id", deleteAlbum);

module.exports = router;