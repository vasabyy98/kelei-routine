const asyncHandler = require("express-async-handler");
const workoutPlan = require("../models/workoutPlanModel");
const User = require("../models/userModel");

// @desc get workout plan
// @route GET /api/goals
// @access Private
const getWorkoutPlan = asyncHandler(async (req, res) => {
  const plan = await workoutPlan.find({ user: req.user.id });

  res.status(200).json(plan);
});

// @desc set workout plan
// @route PUT /api/goals
// @access Private
const setWorkoutPlan = asyncHandler(async (req, res) => {
  if (!req.body.planName) {
    res.status(400);
    throw new Error("Please add a new textfield");
  }
  //   check plan existence
  const planName = req.body.planName;

  const planExists = await workoutPlan.findOne({ planName });
  if (planExists) {
    res.status(400);
    throw new Error("Plan already exists");
  }

  let plan;

  plan = await workoutPlan.create({
    planName: req.body.planName,
    routine: req.body.routine,
    volume: req.body.volume,
    exercises: req.body.exercises,
    user: req.user.id,
  });

  // if (req.body.routineType === "a/b split") {
  //   plan = await workoutPlan.create({
  //     name: req.body.name,
  //     routine: req.body.routineType,
  //     volume: req.body.volume,
  //     upperSplit: req.body.upperSplitExercises,
  //     lowerSplit: req.body.lowerSplitExercises,
  //     user: req.user.id,
  //   });
  // }

  // if (req.body.routineType === "ppl") {
  //   plan = await workoutPlan.create({
  //     name: req.body.name,
  //     routine: req.body.routineType,
  //     volume: req.body.volume,
  //     pushDay: req.body.pushDayExercises,
  //     pullDay: req.body.pullDayExercises,
  //     legsDay: req.body.legsDayExercises,
  //     user: req.user.id,
  //   });
  // }

  // plan = await workoutPlan.create({
  //   name: req.body.name,
  //   routine: req.body.routine,
  //   volume: req.body.volume,
  //   exercises: req.body.exercises,
  //   exercises2: req.body.exercises2,
  //   exercises3: req.body.exercises3,
  //   user: req.user.id,
  // });

  res.status(200).json(plan);
});

// @desc update workout plan
// @route PUT /api/goals
// @access Private
const updateWorkoutPlan = asyncHandler(async (req, res) => {
  const plan = await workoutPlan.findById(req.params.id);

  if (!plan) {
    res.status(400);
    throw new Error("Plan not found.");
  }

  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // make sure the logged in user matches the plan user
  if (plan.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const update = {
    planName: req.body.planName,
    routine: req.body.routine,
    volume: req.body.volume,
  };

  const updatedPlan = await workoutPlan.findByIdAndUpdate(req.params.id, update);

  res.status(200).json(updatedPlan);
});

// @desc delete workout plan
// @route DELETE /api/goals
// @access Private
const deleteWorkoutPlan = asyncHandler(async (req, res) => {
  const plan = await workoutPlan.findById(req.params.id);

  if (!plan) {
    res.status(400);
    throw new Error("Plan not found.");
  }

  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // make sure the logged in user matches the plan user
  if (plan.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await plan.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getWorkoutPlan,
  setWorkoutPlan,
  updateWorkoutPlan,
  deleteWorkoutPlan,
};
