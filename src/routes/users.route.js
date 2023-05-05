const express = require("express");
const router = express.Router();
const { userController } = require("../controllers");

const {signUp, getBySub, getById, updateArray, updateBasic, deleteUser, getByName} = userController;

router
.post("/create", signUp)
.get("/sub/:userSub", getBySub)
.get("/id/:userId", getById)
.patch("/update/array/:userId", updateArray)
.patch("/update/:userId", updateBasic)
.patch("/delete/:userId", deleteUser)
.get("/name/:userName", getByName)

module.exports = router;