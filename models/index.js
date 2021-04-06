console.log('##########  MODELS/INDEX.JS  - CONNECT TO MONGOOSE ########');
require('dotenv').config()
const mongoose = require("mongoose");

const configOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose
  .connect(process.env.MONGODB_URI, configOptions)
  .then(() => console.log("MongoDB successfully connected..."))
  .catch((err) => console.log(`MongoDB connection error: ${err}`));

// module.exports = {
//   Game: require("./game"),
//   User: require("./User"),
// };
