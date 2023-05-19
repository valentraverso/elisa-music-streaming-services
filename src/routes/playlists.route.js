const express = require("express");
const router = express.Router();
const { playlistController } = require("../controllers");
const { verifyRequester } = require("../middlewares/verifyRequester");

const { getAllPlaylist, postPlaylist, getById, updatePlaylist, deletePlaylist,updatePlaylistInfo, getByTitle, getByOwner, updateLikeSong, updatePlaylistImage,updateDislikeSongs, updateEliminateFromPlaylists } = playlistController;

router
    .get("/all", getAllPlaylist)
    .get("/id/:id", getById)
    .get("/title/:title", getByTitle)
    .get("/owner/:idOwner", getByOwner)
    .post("/create", postPlaylist)
    .patch("/update/songs/:id", verifyRequester, updatePlaylist)
    .patch("/update/info/:id", verifyRequester, updatePlaylistInfo)
    .patch("/update/image/:id", verifyRequester, updatePlaylistImage)
    .patch("/update/likes/:id", verifyRequester, updateLikeSong)
    .patch("/update/dislikes/:id", verifyRequester, updateDislikeSongs)
    .patch("/update/songdelete/:playlistId/:songId",  updateEliminateFromPlaylists)
    .delete("/delete/:id", deletePlaylist);

module.exports = router;