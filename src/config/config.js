require("dotenv").config();

const PORT = process.env.PORT || 4000;
const DB = process.env.MONGO_URI;

module.exports = {
    PORT,
    DB
}