const {albumController} = require("./albums.controller")
const { mixController } = require("./mixes.controller");
const {songController} = require("./songs.controller");
const {userController} = require ("./users.controller")

module.exports = {
    albumController,
    mixController,
    songController,
    userController
}