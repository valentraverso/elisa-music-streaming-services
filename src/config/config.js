require("dotenv").config();

const PORT = process.env.PORT || 4000;
const DB = process.env.MONGO_URI;
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE
const AUTH0_ISSUER = process.env.AUTH0_ISSUER
const CLOUD_NAME = process.env.CLOUD_NAME
const CLOUD_API_KEY = process.env.CLOUD_API_KEY
const CLOUD_API_SECRET = process.env.CLOUD_API_SECRET


module.exports = {
    PORT,
    DB,
    AUTH0_AUDIENCE,
    AUTH0_ISSUER,
    CLOUD_NAME,
    CLOUD_API_KEY,
    CLOUD_API_SECRET
}