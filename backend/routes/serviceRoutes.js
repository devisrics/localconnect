const express = require("express");
const router = express.Router();
const Service = require("../models/Service");
const { protect } = require("../middleware/authMiddleware");

// Get all services (Public)
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    console.error("Get Services Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Get service by ID
router.get("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(service);
  } catch (error) {
    console.error("Get Service By ID Error:", error.message);
    res.status(400).json({ message: "Invalid ObjectId" });
  }
});

module.exports = router;
