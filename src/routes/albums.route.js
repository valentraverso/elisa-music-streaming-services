const express = require("express");
const router = express.Router();
const { albumController } = require("../controllers");
const { songController } = require("../controllers");

const { getAllAlbum, createAlbum, updateAlbum, getById, deleteAlbum } = albumController;

router.get("/all", getAllAlbum);
router.get("/:id", getById);
router.post("/create", createAlbum);
router.patch("/update", updateAlbum);
router.delete("/:id/delete", deleteAlbum);

module.exports = router;