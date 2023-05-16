const express = require("express");
const router = express.Router();
const { userController } = require("../controllers");
const { playlistController } = require("../controllers");

const { postUser, getBySub, getById, updateArray, updateBasic, deleteUser, getByName, getByUsername, updateFollows } = userController;
const { createLikePlaylist } = playlistController;

router
    .get("/sub", getBySub)
    .get("/id/:userId", getById)
    .get("/name/:userName", getByName)
    .get("/username/:username", getByUsername)
    .patch("/update/array/:userId", updateArray)
    .patch("/update/:userId", updateBasic)
    .patch("/delete/:userId", deleteUser)
    .patch("/updatefollows", updateFollows)
    .post("/create", postUser, createLikePlaylist);

module.exports = router;