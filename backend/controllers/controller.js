const asyncHandler = require("express-async-handler");

// @desc get goal
// @route GET /api/goals
// @access Private
const getGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ mesage: "get goals" });
});

// @desc set goal
// @route PUT /api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a new textfield");
  }

  res.status(200).json({ mesage: "set goals" });
});

// @desc update goal
// @route PUT /api/goals
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ mesage: `update goal ${req.params.id}` });
});

// @desc delete goal
// @route DELETE /api/goals
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ mesage: `delete goal ${req.params.id}` });
});

module.exports = {
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal,
};
