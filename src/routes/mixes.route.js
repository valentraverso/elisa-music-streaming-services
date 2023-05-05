const express = require("express");
const router = express.Router();
const { mixController } = require("../controllers");

// Import required controllers from the mixController
const {
  getAllMixes,
  getMixById,
  createMix,
  updateMixById,
  deleteMixById,
  getMixByName
} = mixController;

// Define your routes here
router.get("/all", getAllMixes);
router.get("/id/:id", getMixById);
router.get('/name/:name',getMixByName);
router.post("/create", createMix);
router.patch("/update/:id", updateMixById);
router.delete("/delete/:id", deleteMixById);


module.exports = router;
