const express = require("express");
const router = express.Router();
const {
  getWorkoutPlan,
  setWorkoutPlan,
  updateWorkoutPlan,
  deleteWorkoutPlan,
} = require("../controllers/controller");

router.route("/").get(getWorkoutPlan).post(setWorkoutPlan);
router.route("/:id").delete(deleteWorkoutPlan).put(updateWorkoutPlan);

module.exports = router;
