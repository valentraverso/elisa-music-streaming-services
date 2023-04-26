const express = require("express");
const router = express.Router()
const {albumController} = require("../controllers")

const {getAllAlbum} = albumController

router
.get("/all", getAllAlbum)

module.exports = {router}