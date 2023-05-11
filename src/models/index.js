const albumModel = require("./albums.model")
const UserModel = require("./users.model.js")
const songModel = require("./songs.model")
const mixModel = require("./mixes.model")
const genreModel = require("./genre.model")
const playlistModel = require("./playlists.model")


module.exports = {
    albumModel,
    songModel,
    UserModel,
    mixModel,
    genreModel,
    playlistModel
}