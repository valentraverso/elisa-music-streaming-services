const albumRouter = require("./albums.route");
const mixesRouter = require("./mixes.route");
const songRouter = require("./songs.route");
const userRouter = require("./users.route");
const genreRouter = require("./genre.route");
const playlistsRouter = require("./playlists.route")
module.exports = {
    albumRouter,
    mixesRouter,
    songRouter,
    userRouter,
    genreRouter,
    playlistsRouter
}