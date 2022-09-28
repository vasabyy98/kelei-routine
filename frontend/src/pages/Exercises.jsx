import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getExercises, resetExercises } from "../features/exercises/exerciseSlice";

import layout from "../css/layout.module.css";
import styles from "../css/exercise.module.css";
import btnStyles from "../css/buttons.module.css";
import nav from "../css/nav.module.css";
import ExerciseDetails from "../components/exerciseDetails/ExerciseDetails";

function Exercises() {
  const dispatch = useDispatch();

  const { exercises, isError, message } = useSelector((state) => state.exercises);
  const { isSuccess } = useSelector((state) => state.chosenExercise);

  useEffect(() => {
    if (isSuccess) {
      if (isError) console.log(message);

      dispatch(getExercises());

      return () => {
        dispatch(resetExercises());
      };
    }
  }, [isError, message, dispatch, isSuccess]);
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
