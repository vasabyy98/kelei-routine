import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createWorkoutPlan } from "../../features/plans/planSlice";
import { useNavigate } from "react-router-dom";

import ExerciseForm from "../addExerciseForm/ExerciseForm";
import ExerciseList from "../addedExercises/ExerciseList";
import PlanPreview from "../planPreview/PlanPreview";

import layout from "../../css/layout.module.css";
import btnStyles from "../../css/buttons.module.css";

import Header from "../header/Header";

function AddExercises({
  addExercisesSection,
  showAddExercises,
  setShowAddExercises,
  routineType,
  routineVolume,
  setShowPreview,
  showPreview,
  previewSection,
  setShowNamePlan,
  namePlanSection,
  showNamePlan,
}) {
  const [show, setShow] = useState(false);

  const [exercises, setExercises] = useState([]);
  const [massUnit, setMassUnit] = useState("kg");

  const [btnStatus, setBtnStatus] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addExercise = (exerciseInfo, unitInfo) => {
    setExercises((prev) => [...prev, exerciseInfo]);
    setMassUnit(unitInfo);
  };

  const removeExercise = (e) => {
    let val = e.currentTarget.getAttribute("name").toLowerCase();
    setExercises(exercises.filter((exercise) => exercise.exercise !== val));
  };

  const removeAllExercises = () => {
    setExercises("");
  };

  useEffect(() => {
    if (showAddExercises) {
      addExercisesSection.current.classList.add(layout.visible);
    } else {
      addExercisesSection.current.classList.remove(layout.visible);
    }

    if (exercises.length > 0) {
      setBtnStatus(false);
    } else {
      setBtnStatus(true);
    }
  }, [showAddExercises, exercises]);
  return (
    <>
      <section
        ref={addExercisesSection}
        className={`${layout.content__wrapper__bg} ${layout.hidden}`}
      >
        <div className={layout.twoRow__grid__layout}>
          <div className={layout.flex__layout}>
            <Header line1={"add your"} line2={"full body"} line3={"exercises"} />
            <div className={layout.added__exercises}>
              <ExerciseForm
                addExercise={addExercise}
                show={show}
                onClose={() => setShow(false)}
                addExercisesSection={addExercisesSection}
              />
              <ExerciseList
                exercises={exercises}
                massUnit={massUnit}
                removeExercise={removeExercise}
              />
              <div className={btnStyles.btns__col}>
                <button
                  onClick={() => setShow(true)}
                  className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}
                >
                  <span>add exercise</span>
                </button>
                {exercises.length > 0 && (
                  <button
                    onClick={removeAllExercises}
                    className={`${btnStyles.btn} ${btnStyles.secondaryBtn}`}
                  >
                    <span>remove all exercises</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: "var(--padding)" }} className={`${btnStyles.btns__row}`}>
            <button
              onClick={() => setShowAddExercises(false)}
              className={`${btnStyles.btn} ${btnStyles.secondaryBtn} ${btnStyles.arrowBtn}`}
            >
              <span>go back</span>
            </button>
            <button
              disabled={btnStatus}
              onClick={() => setShowPreview(true)}
              className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}
            >
              <span>preview</span>
            </button>
          </div>
        </div>
      </section>
      <PlanPreview
        addExercisesSection={addExercisesSection}
        exercises={exercises}
        massUnit={massUnit}
        routineType={routineType}
        routineVolume={routineVolume}
        showPreview={showPreview}
        setShowPreview={setShowPreview}
        previewSection={previewSection}
        setShowNamePlan={setShowNamePlan}
        namePlanSection={namePlanSection}
        showNamePlan={showNamePlan}
      />
    </>
  );
}

export default AddExercises;
