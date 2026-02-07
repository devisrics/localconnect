const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    providerName: {
      type: String,
      required: true,
    },
    experience: String,
    availability: String,
    rating: Number,
    completedJobs: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
