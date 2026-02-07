const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Service = require("./models/Service");
const services = require("./data/servicedata.json");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");

    await Service.deleteMany();
    console.log("Services deleted");

    await Service.insertMany(services);
    console.log("Services inserted successfully");

    process.exit();
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
