const Booking = require("../models/Booking");

// Create a new booking
exports.createBooking = async (req, res) => {
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
};

// Get bookings for the logged-in user
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("service");
    res.json(bookings);
  } catch (error) {
    console.error("Get My Bookings Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
