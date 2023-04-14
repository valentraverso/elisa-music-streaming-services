const express = require("express");
const cors = require("cors");
const helmet = require("helmet");


const app = express();

// Middlewares
app.use(express.json());
app.use(cors);
app.use(helmet());

// Conect DB