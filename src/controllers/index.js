const {albumController} = require("./albums.controller")
const { mixController } = require("./mixes.controller");
const {songController} = require("./songs.controller");
const {userController} = require ("./users.controller")
const {genreController} = require("./genre.controller")
const {playlistController} = require("./playlists.controller")

module.exports = {
    albumController,
    mixController,
    userController,
    songController,
    genreController,
    playlistController
}