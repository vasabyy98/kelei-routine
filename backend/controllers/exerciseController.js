const asyncHandler = require("express-async-handler");
const exercises = require("../models/exerciseModel");
const User = require("../models/userModel");

// @desc get exercises
// @route GET /api/exercises
// @access Private
const getExercises = asyncHandler(async (req, res) => {
  const exercise = await exercises.find({ user: req.user.id });

  res.status(200).json(exercise);
});

// @desc set workout plan
// @route PUT /api/exercises
// @access Private
const setExercise = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a new textfield");
  }
  //   check exercise existence
  const name = req.params.name;

  const exerciseExists = await exercises.findOne({ name });

  if (exerciseExists) {
    res.status(400);
    throw new Error("Exercise already exists");
  }

  let exercise = await exercises.create({
    name: req.body.name,
    currentWeight: req.body.initialWeight,
    initialWeight: req.body.initialWeight,
    restTime: req.body.restTime,
    user: req.user.id,
  });

  res.status(200).json(exercise);
});

// @desc update workout plan
// @route PUT /api/exercises
// @access Private
const updateWorkoutPlan = asyncHandler(async (req, res) => {
  // const plan = await workoutPlan.findById(req.params.id);
  // if (!plan) {
  //   res.status(400);
  //   throw new Error("Plan not found.");
  // }
  // // check for user
  // if (!req.user) {
  //   res.status(401);
  //   throw new Error("User not found");
  // }
  // // make sure the logged in user matches the plan user
  // if (plan.user.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error("User not authorized");
  // }
  // const updatedPlan = await workoutPlan.findByIdAndUpdate(
  //   req.params.id,
  //   { exercises: objExercises, name: req.body.name },
  //   { new: true }
  // );
  // res.status(200).json(updatedPlan);
});

// @desc delete exercise
// @route DELETE /api/exercises
// @access Private
const deleteExercise = asyncHandler(async (req, res) => {
  const exercise = await exercises.findById(req.params.id);

  if (!exercise) {
    res.status(400);
    throw new Error("Exercise not found.");
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

  await exercise.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getExercises,
  setExercise,
  deleteExercise,
};