const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./utils/connectDB.js");
const jwtCheck = require("./utils/authz.js")
const {albumsRoute}= require("./routes")
const {
    PORT,
    DB
} = require("./config/config.js");
const fileUpload = require("express-fileupload")


const app = express();

// Middlewares
app.use(jwtCheck);
app.use(express.json());
app.use(cors);
app.use(helmet());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './src/assets/tmp/'
}));

// Conect DB
connectDB(app, PORT, DB);

//Routes

app.use("/albums", albumsRoute)