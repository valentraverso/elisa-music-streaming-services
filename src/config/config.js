require("dotenv").config();

const PORT = process.env.PORT || 4000;
const DB = process.env.MONGO_URI;
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE
const AUTH0_ISSUER = process.env.AUTH0_ISSUER


module.exports = {
    PORT,
    DB,
    AUTH0_AUDIENCE,
    AUTH0_ISSUER
}