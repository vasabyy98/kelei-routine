import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getExercises, resetExercises, deleteExercise } from "../features/exercises/exerciseSlice";

import layout from "../css/layout.module.css";
import styles from "../css/exercise.module.css";
import btnStyles from "../css/buttons.module.css";
import header from "../css/header.module.css";
import nav from "../css/nav.module.css";
import ExerciseDetails from "../components/exerciseDetails/ExerciseDetails";

function Exercises() {
  const dispatch = useDispatch();
  const { exercises, isLoading, isError, message } = useSelector((state) => state.exercises);

  useEffect(() => {
    if (isError) console.log(message);

    dispatch(getExercises());

    return () => {
      dispatch(resetExercises());
    };
  }, [isError, message, dispatch]);

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
      <section className={layout.content__wrapper}>
        <div className={layout.threeRow__grid__layout}>
          <nav className={nav.nav}>
            <Link to="/home">
              <span className={nav.arrow__link}>←</span>
            </Link>
            <button to="/home">
              <span className={nav.text__link}>Delete all exercises</span>
            </button>
          </nav>
          <div
            style={{ justifyContent: "unset" }}
            className={`${layout.flex__layout} ${styles.exercises__wrapper}`}
          >
            {exercises.map((exercise, i) => (
              <ExerciseDetails key={exercise._id} exercise={exercise} />
              // <div
              //   key={exercise.exerciseName + i}
              //   data-id={exercise._id}
              //   style={{ height: "unset" }}
              //   className={layout.flex__layout}
              // >
              //   <header
              //     onClick={showHideInfo}
              //     style={{ cursor: "pointer" }}
              //     className={header.header}
              //   >
              //     <h2 className={`${header.heading__h2} ${styles.exercise__name}`}>
              //       {exercise.exerciseName}
              //       <span className={styles.exercise__rm}>({exercise.rm})</span>
              //     </h2>
              //     <button className={header.subheading}>Show info↓</button>
              //   </header>
              //   <div className={styles.exercise__details__wrapper}>
              //     <div className={styles.exercise__details}>
              //       <div className={styles.exercise__inner}>
              //         <span>Current weight:</span>
              //         <span style={{ textTransform: "capitalize" }}>
              //           {exercise.currentWeight}
              //           <span style={{ textTransform: "uppercase" }}>kg</span>
              //         </span>
              //       </div>
              //       <div className={styles.exercise__inner}>
              //         <span>Initial weight:</span>
              //         <span style={{ textTransform: "capitalize" }}>
              //           {exercise.initialWeight}
              //           <span style={{ textTransform: "uppercase" }}>kg</span>
              //         </span>
              //       </div>
              //       <div className={styles.exercise__inner}>
              //         <span>Gain/loss:</span>
              //         <span style={{ textTransform: "capitalize" }}>
              //           {((exercise.currentWeight - exercise.initialWeight) /
              //             exercise.initialWeight) *
              //             100}
              //           <span style={{ textTransform: "uppercase" }}>%</span>
              //         </span>
              //       </div>
              //       <div className={styles.exercise__inner}>
              //         <span>Average rest time:</span>
              //         <span style={{ textTransform: "capitalize" }}>
              //           {exercise.restTime}
              //           <span style={{ textTransform: "uppercase" }}>sec</span>
              //         </span>
              //       </div>
              //     </div>
              //     <div className={btnStyles.btns__col}>
              //       <button disabled className={`${btnStyles.btn} ${btnStyles.secondaryBtn}`}>
              //         <span>edit exercise</span>
              //       </button>
              //       <button
              //         onClick={(e) => {
              //           const id = e.currentTarget.offsetParent.parentElement.dataset.id;
              //           dispatch(deleteExercise(id));
              //         }}
              //         className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}
              //       >
              //         <span>remove exercise</span>
              //       </button>
              //     </div>
              //   </div>
              // </div>
            ))}
          </div>
          <div className={btnStyles.btns__row}>
            <Link className={`${btnStyles.btn} ${btnStyles.primaryBtn}`} to="/create-exercise">
              <span>create new exercise</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Exercises;
