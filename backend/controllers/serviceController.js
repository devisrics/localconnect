const Service = require("../models/Service");

// Get all services
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find().populate("provider", "name");
    res.json(services);
  } catch (error) {
    console.error("Get Services Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get service by ID
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate("provider");
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json(service);
  } catch (error) {
    console.error("Get Service By ID Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new service
exports.createService = async (req, res) => {
  try {
    const service = await Service.create({
      ...req.body,
      provider: req.user._id,
    });
    res.status(201).json(service);
  } catch (error) {
    console.error("Create Service Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
