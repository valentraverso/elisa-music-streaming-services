const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./utils/connectDB.js");
const jwtCheck = require("./utils/authz.js")
const {albumRouter}= require("./routes")
const {
    PORT,
    DB
} = require("./config/config.js");


const app = express();

// Middlewares
app.use(jwtCheck);
app.use(express.json());
app.use(cors());
app.use(helmet());

// Conect DB
connectDB(app, PORT, DB);

//Routes

app.use("/albums", albumRouter)