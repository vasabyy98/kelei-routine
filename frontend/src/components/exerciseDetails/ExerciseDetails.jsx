import React from "react";
import { useDispatch } from "react-redux";
import { deleteExercise } from "../../features/exercises/exerciseSlice";

import layout from "../../css/layout.module.css";
import styles from "../../css/exercise.module.css";
import btnStyles from "../../css/buttons.module.css";
import header from "../../css/header.module.css";

function ExerciseDetails({ exercise }) {
  const dispatch = useDispatch();

  const showHideInfo = (e) => {
    const target = e.currentTarget.nextElementSibling;

    if (target.classList.length == 1) {
      target.classList.add(styles.show);
      e.currentTarget.children[1].textContent = "Hide info↑";
    } else {
      target.classList.remove(styles.show);
      e.currentTarget.children[1].textContent = "Show info↓";
    }
  };
  return (
    <>
      <div data-id={exercise._id} style={{ height: "unset" }} className={layout.flex__layout}>
        <header onClick={showHideInfo} style={{ cursor: "pointer" }} className={header.header}>
          <h2 className={`${header.heading__h2} ${styles.exercise__name}`}>
            {exercise.exerciseName}
            <span className={styles.exercise__rm}>({exercise.rm})</span>
          </h2>
          <button className={header.subheading}>Show info↓</button>
        </header>
        <div className={styles.exercise__details__wrapper}>
          <div className={styles.exercise__details}>
            <div className={styles.exercise__inner}>
              <span>Current weight:</span>
              <span style={{ textTransform: "capitalize" }}>
                {exercise.currentWeight}
                <span style={{ textTransform: "uppercase" }}>kg</span>
              </span>
            </div>
            <div className={styles.exercise__inner}>
              <span>Initial weight:</span>
              <span style={{ textTransform: "capitalize" }}>
                {exercise.initialWeight}
                <span style={{ textTransform: "uppercase" }}>kg</span>
              </span>
            </div>
            <div className={styles.exercise__inner}>
              <span>Gain/loss:</span>
              <span style={{ textTransform: "capitalize" }}>
                {((exercise.currentWeight - exercise.initialWeight) / exercise.initialWeight) * 100}
                <span style={{ textTransform: "uppercase" }}>%</span>
              </span>
            </div>
            <div className={styles.exercise__inner}>
              <span>Average rest time:</span>
              <span style={{ textTransform: "capitalize" }}>
                {exercise.restTime}
                <span style={{ textTransform: "uppercase" }}>sec</span>
              </span>
            </div>
          </div>
          <div className={btnStyles.btns__col}>
            <button disabled className={`${btnStyles.btn} ${btnStyles.secondaryBtn}`}>
              <span>edit exercise</span>
            </button>
            <button
              onClick={() => dispatch(deleteExercise(exercise._id))}
              className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}
            >
              <span>remove exercise</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExerciseDetails;
