const express = require("express");
const router = express.Router();
const {
  getWorkoutPlan,
  setWorkoutPlan,
  updateWorkoutPlan,
  deleteWorkoutPlan,
} = require("../controllers/workoutPlanController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getWorkoutPlan).post(protect, setWorkoutPlan);
router.route("/:id").delete(protect, deleteWorkoutPlan).put(protect, updateWorkoutPlan);

module.exports = router;
