require("dotenv").config();

const PORT = process.env.PORT || 4000;
const MONGO_URI = "YnoIngles";

module.exports = {
    PORT,
    MONGO_URI
}