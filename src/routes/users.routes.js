const express = require("express");
const router = express.Router();
const { userController } = require("../controllers");

const {signUp} = userController;

router
.post("/create", signUp)

module.exports = router;