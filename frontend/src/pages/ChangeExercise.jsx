import React, { useState, useRef, useEffect, useLayoutEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { updateExercise, resetChosenExercise } from "../features/exercises/exerciseToChangeSlice";

import { gsap } from "gsap";

import layout from "../css/layout.module.css";
import btnStyles from "../css/buttons.module.css";
import header from "../css/header.module.css";
import nav from "../css/nav.module.css";
import styles from "../css/signIn.module.css";

function ChangeExercise() {
  const staggerAnimationContainer = useRef();
  const buttons = useRef();
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
            stagger: 0.2,
            duration: 1,
          },
          "+0.5"
        )
        .fromTo(
          buttons.current,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 1,
          },
          "+1"
        );
    }, staggerAnimationContainer);

    return () => ctx.revert();
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const chosenExercise = useSelector((state) => state.chosenExercise);

  const [exerciseData, setExerciseData] = useState({
    exerciseName: chosenExercise.exerciseName,
    weight: chosenExercise.currentWeight,
  });

  const { exerciseName, weight } = exerciseData;

  useEffect(() => {
    if (chosenExercise.exerciseName === "") {
      navigate("/exercises");
    }
  });

  const onChange = (e) => {
    setExerciseData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const exerciseData = {
      exerciseName: exerciseName,
      currentWeight: weight,
    };

    const id = chosenExercise.exercise_id;

    dispatch(updateExercise({ id, exerciseData }));
    dispatch(resetChosenExercise());
    navigate("/exercises");
  };
  return (
    <>
      <section className={layout.content__wrapper}>
        <form onSubmit={onSubmit} className={`${styles.form} ${layout.threeRow__grid__layout}`}>
          <nav ref={navContainer} className={nav.nav}>
            <Link to="/exercises">
              <span className={nav.arrow__link}>←</span>
            </Link>
          </nav>
          <div ref={staggerAnimationContainer} className={styles.form__inner}>
            <header className={header.header}>
              <h2 className={`${header.heading__h2} ${"animate__item"}`}>Change exercise</h2>
              <p
                style={{ maxWidth: "unset" }}
                className={`${header.subheading} ${"animate__item"}`}
              >
                Change exercise name and weight.
              </p>
            </header>
            <div className={styles.input__wrapper}>
              <div className={`${styles.form__group} ${"animate__item--input"}`}>
                <input
                  type="text"
                  className={styles.form__control}
                  id="exerciseName"
                  name="exerciseName"
                  value={exerciseName}
                  onChange={onChange}
                  placeholder="Exercise name"
                />
                <div className={styles.gradient__stroke}></div>
              </div>
              <div className={`${styles.form__group} ${"animate__item--input"}`}>
                <input
                  type="number"
                  className={styles.form__control}
                  id="weight"
                  value={weight}
                  onChange={onChange}
                  name="weight"
                  placeholder="Weight(kg)"
                />
                <div className={styles.gradient__stroke}></div>
              </div>
            </div>
          </div>
          <div ref={buttons} className={btnStyles.btns__row}>
            <button type="submit" className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}>
              <span>change exercise</span>
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default ChangeExercise;
