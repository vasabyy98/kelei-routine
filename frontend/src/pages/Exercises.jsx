import React, { useEffect, useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getExercises, resetExercises } from "../features/exercises/exerciseSlice";

import { gsap } from "gsap";

import layout from "../css/layout.module.css";
import styles from "../css/exercise.module.css";
import btnStyles from "../css/buttons.module.css";
import nav from "../css/nav.module.css";
import ExerciseDetails from "../components/exerciseDetails/ExerciseDetails";

function Exercises() {
  const buttons = useRef();
  const navContainer = useRef();
  const tl = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
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
            delay: 0,
            duration: 1,
          },
          "+0.1"
        )
        .fromTo(
          buttons.current,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 1,
            delay: 0.5,
          },
          "+0.5"
        );
    });

    return () => ctx.revert();
  }, []);

  const dispatch = useDispatch();

  const { exercises, isError, message } = useSelector((state) => state.exercises);

  useEffect(() => {
    if (isError) console.log(message);

    dispatch(getExercises());

    return () => {
      dispatch(resetExercises());
    };
  }, [isError, message, dispatch]);
  return (
    <>
      <section className={layout.content__wrapper}>
        <div className={layout.threeRow__grid__layout}>
          <nav ref={navContainer} className={nav.nav}>
            <Link to="/home">
              <span className={nav.arrow__link}>←</span>
            </Link>
            <span onClick={() => window.location.reload()} className={nav.text__link}>
              Refresh
            </span>
          </nav>
          <div
            style={{ justifyContent: "unset" }}
            className={`${layout.flex__layout} ${styles.exercises__wrapper}`}
          >
            {exercises.map((exercise, i) => (
              <ExerciseDetails key={exercise._id} exercise={exercise} />
            ))}
          </div>
          <div ref={buttons} className={btnStyles.btns__row}>
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
