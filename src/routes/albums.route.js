const express = require("express");
const router = express.Router();
const { albumController } = require("../controllers");

const { getAllAlbum, createAlbum, updateAlbum, getById, deleteAlbum } = albumController;

router.get("/all", getAllAlbum);
router.post("/create", createAlbum);
router.post("/update", updateAlbum);
router.get("/:id", getById);
router.delete("/:id/delete", deleteAlbum);

module.exports = router;