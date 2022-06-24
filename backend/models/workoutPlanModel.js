const mongoose = require("mongoose");

const workoutPlanSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  exercises: [
    {
      _id: false,
      exercise: String,
      weight: String,
      stats: Object,
    },
  ],
  // exercises: {
  //   type: Array,
  //   required: true,
  // },
  // weights: {
  //   type: Array,
  //   required: true,
  // },
});

module.exports = mongoose.model("workoutPlan", workoutPlanSchema);
