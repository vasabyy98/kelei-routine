const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  currentWeight: {
    type: Number,
    required: true,
  },
  initialWeight: {
    type: Number,
    required: true,
  },
  restTime: {
    type: Number,
  },
});

module.exports = mongoose.model("exercises", exerciseSchema);
