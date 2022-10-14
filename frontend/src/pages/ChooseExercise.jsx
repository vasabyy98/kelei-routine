import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { setExercise } from "../features/plans/chosenSplit";
import { addExercises } from "../features/exercises/completedExerciseSlice";

import layout from "../css/layout.module.css";
import header from "../css/header.module.css";
import nav from "../css/nav.module.css";
import styles from "../css/signIn.module.css";

function ChooseExercise() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allExercises = useSelector((state) => state.exercises.exercises);
  const selectedSplit = useSelector((state) => state.chosenSplit.split);
  const planExercises = useSelector((state) => state.chosenPlan.exercises[0][selectedSplit]);
  const splitExercises = [];

  const [completed, setCompleted] = useState(0);
  const completedExercises = useSelector((state) => state.completedExercises);

  const exercises = [];

  planExercises.forEach((exercise) => {
    exercises.push({ exercise, isCompleted: false });
  });

  useEffect(() => {
    if (selectedSplit === "") {
      navigate("/plans");
    }
  }, [selectedSplit]);

  useEffect(() => {
    if (!completedExercises.isWorkoutStarted) {
      dispatch(addExercises(exercises));
    }
  }, []);

  useEffect(() => {
    splitExercises.forEach((exercise) => {
      completedExercises.exercises.forEach((el) => {
        if (exercise._id === el.exercise && el.isCompleted === true) {
          setCompleted((completed) => {
            return completed + 1;
          });
        }
      });
    });
  }, [completedExercises]);

  allExercises.forEach((exercise) => {
    planExercises.forEach((el) => {
      if (exercise._id === el) splitExercises.push(exercise);
    });
  });

  const onClick = (e) => {
    const exercise = e.currentTarget.value;

    dispatch(setExercise(exercise));
    navigate("/rep-counter");
  };
  return (
    <>
      <section className={layout.content__wrapper}>
        <div className={`${styles.form} ${layout.twoRow__grid__layout}`}>
          <nav className={nav.nav}>
            <Link to="/choose-split">
              <span className={nav.arrow__link}>←</span>
            </Link>
          </nav>
          {splitExercises.length !== 0 && (
            <div className={styles.form__inner}>
              <header className={header.header}>
                <h2 className={header.heading__h2}>Choose exercise</h2>
                <p style={{ maxWidth: "unset" }} className={header.subheading}>
                  {Math.round((completed / completedExercises.exercises.length) * 100)}% -
                  completed.
                </p>
              </header>
              <div className={styles.input__wrapper}>
                {splitExercises.map((exercise) => (
                  <div key={exercise._id} className={styles.form__group}>
                    <div className={`${styles.form__control}`}>
                      <span>{exercise.exerciseName}</span>
                    </div>
                    <input
                      onClick={onClick}
                      type="checkbox"
                      value={exercise._id}
                      name="split"
                      className={styles.form__control__radio}
                    />
                    <div className={styles.gradient__stroke}></div>
                    {/* {completedExercises.exercises.length > 0 && (
                      <> */}
                    {completedExercises.exercises.map((el) => {
                      if (exercise._id === el.exercise && el.isCompleted === true) {
                        return (
                          <div style={{ opacity: "1" }} className={styles.selected}>
                            completed
                          </div>
                        );
                      }
                    })}
                    {/* </>
                    )} */}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default ChooseExercise;
