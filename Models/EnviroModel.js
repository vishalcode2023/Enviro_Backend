const mongoose = require("mongoose");

const enviroModelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
    message: {
        type: String,
        required: true,
    },
});

const EnviroModel = mongoose.model("EnviroModel", enviroModelSchema);
module.exports = EnviroModel;
