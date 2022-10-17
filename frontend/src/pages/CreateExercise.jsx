import React, { useState, useRef, useEffect, useLayoutEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { createExercise } from "../features/exercises/exerciseSlice";

import { gsap } from "gsap";

import layout from "../css/layout.module.css";
import btnStyles from "../css/buttons.module.css";
import header from "../css/header.module.css";
import nav from "../css/nav.module.css";
import styles from "../css/signIn.module.css";

function CreateExercise() {
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

  const [exerciseData, setExerciseData] = useState({
    exerciseName: "",
    weight: "",
    rm: "8-12RM",
  });

  const { exerciseName, weight, rm } = exerciseData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const active = useRef();

  useEffect(() => {
    if (active.current.value === "8-12RM") {
      active.current.checked = true;
    }
  }, []);

  const onChange = (e) => {
    setExerciseData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      exerciseName: exerciseName,
      initialWeight: weight,
      currentWeight: weight,
      restTime: 0,
      rm: rm,
    };

    dispatch(createExercise(exercise));
    navigate("/exercises");
  };

  const onClick = (e) => {
    setExerciseData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
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
              <h2 className={`${header.heading__h2} ${"animate__item"}`}>Create new exercise</h2>
              <p
                style={{ maxWidth: "unset" }}
                className={`${header.subheading} ${"animate__item"}`}
              >
                Set exercise name, weight and choose the repetition range.
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
              <div className={`${styles.form__group} ${"animate__item--input"}`}>
                <div className={`${styles.form__control}`}>
                  <span>3-5RM</span>
                </div>
                <input
                  onClick={onClick}
                  type="radio"
                  value="3-5RM"
                  name="rm"
                  className={styles.form__control__radio}
                />
                <div className={styles.gradient__stroke}></div>
                <div className={styles.selected}>selected</div>
              </div>
              <div className={`${styles.form__group} ${"animate__item--input"}`}>
                <div className={`${styles.form__control}`}>
                  <span>8-12RM</span>
                </div>
                <input
                  ref={active}
                  onClick={onClick}
                  type="radio"
                  value="8-12RM"
                  name="rm"
                  className={styles.form__control__radio}
                />
                <div className={styles.gradient__stroke}></div>
                <div className={styles.selected}>selected</div>
              </div>
              <div className={`${styles.form__group} ${"animate__item--input"}`}>
                <div className={`${styles.form__control}`}>
                  <span>8-15RM</span>
                </div>
                <input
                  onClick={onClick}
                  type="radio"
                  value="8-15RM"
                  name="rm"
                  className={styles.form__control__radio}
                />
                <div className={styles.gradient__stroke}></div>
                <div className={styles.selected}>selected</div>
              </div>
              <div className={`${styles.form__group} ${"animate__item--input"}`}>
                <div className={`${styles.form__control}`}>
                  <span>15-20RM</span>
                </div>
                <input
                  onClick={onClick}
                  type="radio"
                  value="15-20RM"
                  name="rm"
                  className={styles.form__control__radio}
                />
                <div className={styles.gradient__stroke}></div>
                <div className={styles.selected}>selected</div>
              </div>
            </div>
            <p
              style={{ maxWidth: "unset", margin: "var(--gap-children 0" }}
              className={`${header.subheading} ${"animate__item"}`}
            >
              RM - repetitions max with N weight.
            </p>
          </div>
          <div ref={buttons} className={btnStyles.btns__row}>
            <button type="submit" className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}>
              <span>create exercise</span>
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default CreateExercise;
