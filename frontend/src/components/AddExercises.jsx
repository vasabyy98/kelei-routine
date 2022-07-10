import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { createWorkoutPlan } from "../features/plans/planSlice";
import { useNavigate } from "react-router-dom";

import ExerciseForm from "../components/ExerciseForm";
import ExerciseList from "../components/ExerciseList";
import PlanPreview from "../components/PlanPreview";

import layout from "../css/layout.module.css";
import styles from "../css/signIn.module.css";
import btnStyles from "../css/buttons.module.css";

function AddExercises({
  addExercisesSection,
  showAddExercises,
  setShowAddExercises,
  routineType,
  routineVolume,
  setShowPreview,
  showPreview,
  previewSection,
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

  const createPlan = () => {
    const name = "kelei routine";
    const routine = routineType;

    exercises.forEach((el) => {
      el.weight += massUnit;
      el.stats = {
        initialWeight: el.weight,
        currentWeight: el.weight,
        avgRest: 0,
      };
    });

    dispatch(createWorkoutPlan({ name, exercises, routine }));
    navigate("/home");
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
      <section ref={addExercisesSection} className={`${layout.content__wrapper} ${layout.hidden}`}>
        <div className={layout.threeRow__grid__layout}>
          <header style={{ marginTop: "var(--padding)" }}>
            <div className={styles.form__heading}>
              <span>add your upper</span>
            </div>
            <div className={styles.form__heading}>
              <span>split exercises</span>
            </div>
          </header>
          <div className={layout.added__exercises}>
            <ExerciseForm addExercise={addExercise} show={show} onClose={() => setShow(false)} />
            <ExerciseList
              exercises={exercises}
              massUnit={massUnit}
              removeExercise={removeExercise}
            />
            <div className={btnStyles.btns__col}>
              <div className={`${btnStyles.form__btns}`}>
                <button
                  onClick={() => setShow(true)}
                  className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}
                >
                  <span>add exercise</span>
                </button>
              </div>
              {exercises.length > 0 && (
                <div className={`${btnStyles.form__btns}`}>
                  <button
                    onClick={removeAllExercises}
                    className={`${btnStyles.btn} ${btnStyles.secondaryBtn}`}
                  >
                    <span>remove all exercises</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div style={{ marginBottom: "var(--padding)" }} className={`${btnStyles.btns__row}`}>
            <button
              onClick={() => setShowAddExercises(false)}
              className={`${btnStyles.btn} ${btnStyles.secondaryBtn} ${btnStyles.arrowBtn}`}
            >
              <span>←</span>
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
        exercises={exercises}
        massUnit={massUnit}
        routineType={routineType}
        routineVolume={routineVolume}
        showPreview={showPreview}
        setShowPreview={setShowPreview}
        previewSection={previewSection}
      />
    </>
  );
}

export default AddExercises;
