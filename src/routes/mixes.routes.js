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
} = mixController;

// Define your routes here
router.get("/mixes", getAllMixes);
router.get("/mixes/:id", getMixById);
router.post("/mixes", createMix);
router.put("/mixes/:id", updateMixById);
router.delete("/mixes/:id", deleteMixById);


module.exports = router;
