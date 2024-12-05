const mongoose = require("mongoose");
module.exports. connect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to Database!"))
    .catch((error) => {
      console.error("Error connecting to Database!", error.message);
    });
};