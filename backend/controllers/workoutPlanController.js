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
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a new textfield");
  }

  const plan = await workoutPlan.create({
    name: req.body.name,
    routine: req.body.routine,
    volume: req.body.volume,
    exercises: req.body.exercises,
    exercises2: req.body.exercises2,
    exercises3: req.body.exercises3,
    user: req.user.id,
  });

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

  const updatedPlan = await workoutPlan.findByIdAndUpdate(
    req.params.id,
    { exercises: objExercises, name: req.body.name },
    { new: true }
  );

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
