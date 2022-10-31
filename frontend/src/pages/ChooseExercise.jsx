import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { setExercise } from "../features/plans/chosenSplit";
import { addExercises } from "../features/exercises/completedExerciseSlice";

import { gsap } from "gsap";

import layout from "../css/layout.module.css";
import header from "../css/header.module.css";
import nav from "../css/nav.module.css";
import styles from "../css/signIn.module.css";

function ChooseExercise() {
  const staggerAnimationContainer = useRef(null);
  const navContainer = useRef();
  const tl = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap
        .timeline()
        .fromTo(
          navContainer.current,
          {
            opacity: 0,
            yPercent: -100,
          },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
          },
          "+0.1"
        )
        .fromTo(
          ".animate__item",
          {
            opacity: 0,
            y: 25,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 1,
          },
          "+0.25"
        )
        .fromTo(
          ".animate__item--input",
          {
            opacity: 0,
            scale: 0.85,
          },
          {
            opacity: 1,
            scale: 1,
            stagger: 0.1,
            duration: 1,
          },
          "+0.5"
        );
    }, staggerAnimationContainer);

    return () => ctx.revert();
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allExercises = useSelector((state) => state.exercises.exercises);
  const selectedSplit = useSelector((state) => state.chosenSplit.split);

  const planExercises = useSelector((state) => state.chosenPlan.exercises[0][selectedSplit]);
  const exercises = [];

  planExercises.forEach((exercise) => {
    exercises.push({ exercise, isCompleted: false });
  });

  const splitExercises = [];

  const [completed, setCompleted] = useState(0);
  const completedExercises = useSelector((state) => state.completedExercises);

  useEffect(() => {
    if (selectedSplit === "") {
      navigate("/plans");
    }
  });

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
          <nav ref={navContainer} className={nav.nav}>
            {selectedSplit === "Fullbody" ? (
              <Link to="/plans">
                <span className={nav.arrow__link}>←</span>
              </Link>
            ) : (
              <Link to="/choose-split">
                <span className={nav.arrow__link}>←</span>
              </Link>
            )}
          </nav>
          {splitExercises.length !== 0 && (
            <div ref={staggerAnimationContainer} className={styles.form__inner}>
              <header className={header.header}>
                <h2 className={`${header.heading__h2} ${"animate__item"}`}>Choose exercise</h2>
                <p
                  style={{ maxWidth: "unset" }}
                  className={`${header.subheading} ${"animate__item"}`}
                >
                  {Math.round((completed / completedExercises.exercises.length) * 100)}% -
                  completed.
                </p>
              </header>
              <div className={styles.input__wrapper}>
                {splitExercises.map((exercise) => (
                  <div
                    key={exercise._id}
                    className={`${styles.form__group} ${"animate__item--input"}`}
                  >
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
