const express = require("express");
const router = express.Router();
const { getExercises, setExercise, deleteExercise } = require("../controllers/exerciseController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getExercises).post(protect, setExercise);
router.route("/:id").delete(protect, deleteExercise);

module.exports = router;
