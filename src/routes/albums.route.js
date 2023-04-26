const express = require("express");
const router = express.Router()
const { albumController } = require("../controllers")

const { getAllAlbum } = albumController

const albumRouter = router.get("/all", getAllAlbum)

module.exports =  albumRouter 