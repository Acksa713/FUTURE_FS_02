const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  source: {
    type: String,
    required: true
  },

  status: {
    type: String,
    default: "new"
  },

  notes: {
    type: String,
    default: ""
  }

}, { timestamps: true });

module.exports = mongoose.model("Lead", leadSchema);