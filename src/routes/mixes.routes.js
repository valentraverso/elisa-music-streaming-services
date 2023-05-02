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
router.get("/", getAllMixes);
router.get("/:id", getMixById);
router.post("/", createMix);
router.put("/:id", updateMixById);
router.delete("/:id", deleteMixById);

module.exports = router;
