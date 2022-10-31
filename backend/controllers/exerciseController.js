const asyncHandler = require("express-async-handler");
const Exercises = require("../models/exerciseModel");
const User = require("../models/userModel");

// @desc get exercises
// @route GET /api/exercises
// @access Private
const getExercises = asyncHandler(async (req, res) => {
  const exercise = await Exercises.find({ user: req.user.id });

  res.status(200).json(exercise);
});

// @desc create exercise
// @route PUT /api/exercises
// @access Private
const setExercise = asyncHandler(async (req, res) => {
  if (!req.body.exerciseName) {
    res.status(400);
    throw new Error("Please add a new textfield");
  }

  let exercise = await Exercises.create({
    exerciseName: req.body.exerciseName,
    currentWeight: req.body.currentWeight,
    initialWeight: req.body.initialWeight,
    rm: req.body.rm,
    user: req.user.id,
  });

  res.status(200).json(exercise);
});

// @desc update exercise
// @route PUT /api/exercises
// @access Private
const updateExercise = asyncHandler(async (req, res) => {
  const exercise = await Exercises.findById(req.params.id);
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
  if (exercise.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const update = {
    exerciseName: req.body.exerciseName,
    currentWeight: req.body.currentWeight,
  };

  const updatedExercise = await Exercises.findByIdAndUpdate(req.params.id, update);

  res.status(200).json(updatedExercise);
});

// @desc delete exercise
// @route DELETE /api/exercises
// @access Private
const deleteExercise = asyncHandler(async (req, res) => {
  const exercise = await Exercises.findById(req.params.id);

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
  if (exercise.user.toString() !== req.user.id) {
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
  updateExercise,
};
