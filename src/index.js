const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./utils/connectDB.js");
const jwtCheck = require("./utils/authz.js")
const {
    albumRouter,
    songRouter,
    userRouter,
    mixesRouter,
    genreRouter,
    playlistsRouter
}= require("./routes")
const {
    PORT,
    DB
} = require("./config/config.js");
const fileUpload = require("express-fileupload")

console.log("nuevo usuario")

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(jwtCheck);
app.use(helmet());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './src/assets/tmp/'
}));

// Conect DB
connectDB(app, PORT, DB);

//Routes 
app.use("/albums", albumRouter)
app.use("/songs", songRouter)
app.use("/users", userRouter)
app.use("/mixes", mixesRouter)
app.use("/genres", genreRouter)
app.use("/playlists", playlistsRouter)