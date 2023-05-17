const express = require("express");
const router = express.Router();
const { userController } = require("../controllers");
const { playlistController } = require("../controllers");
const { verifyRequester } = require("../middlewares/verifyRequester");

const { postUser, getBySub, getById, updateArray, updateBasic, deleteUser, getByName, getByUsername, updateFollows, updateUserImage, updateFollowsTypes, updateUnfollowsTypes, updateUnFollows } = userController;
const { createLikeSongs } = playlistController;

router
    .get("/sub", getBySub)
    .get("/id/:userId", getById)
    .get("/name/:userName", getByName)
    .get("/username/:username", getByUsername)
    .patch("/update/array/:userId", updateArray)
    .patch("/update/:userId", updateBasic)
    .patch("/updatefollows", updateFollows)
    .patch("/updateunfollows", updateUnFollows)
    .patch("/update/image/:userId", updateUserImage)
    .patch("/update/:type/follow/:id", verifyRequester, updateFollowsTypes)
    .patch("/update/:type/unfollow/:id", verifyRequester, updateUnfollowsTypes)
    .patch("/delete/:userId", deleteUser)
    .post("/create", postUser, createLikeSongs)

module.exports = router;