const {albumController} = require("./albums.controller")
const { mixController } = require("./mixes.controller");
const {songController} = require("./songs.controller");
const {genreController} = require("./genre.controller")

module.exports = {
    albumController,
    mixController,
    songController,
    genreController
}