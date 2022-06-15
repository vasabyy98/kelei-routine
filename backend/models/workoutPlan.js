const mongoose = require("mongoose");

const workoutPlanSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  text: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("workoutPlan", workoutPlanSchema);
