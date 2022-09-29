const mongoose = require("mongoose");

const workoutPlanSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  planName: {
    type: String,
    required: true,
    unique: true,
  },
  routine: {
    type: String,
    required: true,
  },
  volume: {
    type: Number,
    required: true,
  },
  exercises: [
    {
      _id: false,
      type: Array,
    },
  ],
  // upperSplit: [
  //   {
  //     _id: false,
  //     exercise: String,
  //   },
  // ],
  // lowerSplit: [
  //   {
  //     _id: false,
  //     exercise: String,
  //   },
  // ],
  // pushDay: [
  //   {
  //     _id: false,
  //     exercise: String,
  //   },
  // ],
  // pullDay: [
  //   {
  //     _id: false,
  //     exercise: String,
  //   },
  // ],
  // legsDay: [
  //   {
  //     _id: false,
  //     exercise: String,
  //   },
  // ],
});

module.exports = mongoose.model("workoutPlan", workoutPlanSchema);
