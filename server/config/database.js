const mongoose = require("mongoose");

const MONGO_URI = 'mongodb+srv://mansoorkhan:8Zeb07mpjlSahiNo@cluster0.b2wfqum.mongodb.net/?retryWrites=true&w=majority';

exports.connect = () => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("Database connection failed.");
      console.error(error);
      process.exit(1);
    });
};
