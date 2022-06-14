const mongoose = require("mongoose");

const workoutPlanSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("workoutPlan", workoutPlanSchema);
