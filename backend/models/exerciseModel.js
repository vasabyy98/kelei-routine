const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  exerciseName: {
    type: String,
    required: true,
  },
  currentWeight: {
    type: Number,
    required: true,
  },
  initialWeight: {
    type: Number,
    required: true,
  },
  rm: {
    type: String,
  },
});

module.exports = mongoose.model("Exercise", exerciseSchema);
