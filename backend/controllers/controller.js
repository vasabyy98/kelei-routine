const asyncHandler = require("express-async-handler");
const workoutPlan = require("../model/workoutPlan");

// @desc get workout plan
// @route GET /api/goals
// @access Private
const getWorkoutPlan = asyncHandler(async (req, res) => {
  const plan = await workoutPlan.find();

  res.status(200).json({ plan });
});

// @desc set workout plan
// @route PUT /api/goals
// @access Private
const setWorkoutPlan = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a new textfield");
  }

  const plan = await workoutPlan.create({
    text: req.body.text,
  });

  res.status(200).json({ plan });
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

  const updatedPlan = await workoutPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json({ updatedPlan });
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

  await plan.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getWorkoutPlan,
  setWorkoutPlan,
  updateWorkoutPlan,
  deleteWorkoutPlan,
};
