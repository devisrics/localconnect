const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const { protect } = require("../middleware/authMiddleware");

// Create a new booking
router.post("/", protect, async (req, res) => {
  try {
    const { serviceId, bookingDate, address } = req.body;

    if (!serviceId || !bookingDate || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const booking = await Booking.create({
      user: req.user._id,
      service: serviceId,
      bookingDate,
      address,
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error("Create Booking Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Get bookings for the logged-in user
router.get("/my", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("service");
    res.json(bookings);
  } catch (error) {
    console.error("Get My Bookings Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Cancel a booking
router.put("/:id/cancel", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    booking.status = "cancelled";
    await booking.save();

    res.json(booking);
  } catch (error) {
    console.error("Cancel Booking Error:", error.message);
    res.status(400).json({ message: "Invalid booking ID" });
  }
});

module.exports = router;
