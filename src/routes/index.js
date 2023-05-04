const albumRouter = require("./albums.route");
const mixesRouter = require("./mixes.routes");
const songRouter = require("./songs.route");
const userRouter = require("./users.routes");
const genreRouter = require("./genre.routes");

module.exports = {
    albumRouter,
    mixesRouter,
    songRouter,
    userRouter,
    genreRouter
}