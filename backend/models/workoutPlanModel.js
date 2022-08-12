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
    unique: true,
  },
  routine: {
    type: String,
    required: true,
  },
  volume: {
    type: String,
    required: true,
  },
  // exercises: [
  //   {
  //     _id: false,
  //     exercise: String,
  //     weight: String,
  //     stats: Object,
  //   },
  // ],
  // exercises2: [
  //   {
  //     _id: false,
  //     exercise: String,
  //     weight: String,
  //     stats: Object,
  //   },
  // ],
  // exercises3: [
  //   {
  //     _id: false,
  //     exercise: String,
  //     weight: String,
  //     stats: Object,
  //   },
  // ],
  fullbody: [
    {
      _id: false,
      exercise: String,
      currentWeight: Number,
      initialWeight: Number,
      restTime: Number,
    },
  ],
  upperSplit: [
    {
      _id: false,
      exercise: String,
      currentWeight: Number,
      initialWeight: Number,
      restTime: Number,
    },
  ],
  lowerSplit: [
    {
      _id: false,
      exercise: String,
      currentWeight: Number,
      initialWeight: Number,
      restTime: Number,
    },
  ],
  pushDay: [
    {
      _id: false,
      exercise: String,
      currentWeight: Number,
      initialWeight: Number,
      restTime: Number,
    },
  ],
  pullDay: [
    {
      _id: false,
      exercise: String,
      currentWeight: Number,
      initialWeight: Number,
      restTime: Number,
    },
  ],
  legsDay: [
    {
      _id: false,
      exercise: String,
      weight: String,
    },
  ],
});

module.exports = mongoose.model("workoutPlan", workoutPlanSchema);
