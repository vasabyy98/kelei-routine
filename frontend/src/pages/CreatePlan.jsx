import React, { useState, useRef, useEffect, useLayoutEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getExercises } from "../features/exercises/exerciseSlice";

import { createPlan } from "../features/plans/planSlice";

import FullbodySplit from "../components/planSplits/FullbodySplit";
import ABSPlit from "../components/planSplits/ABSplit";
import PPLSplit from "../components/planSplits/PPLSplit";

import { gsap } from "gsap";

import layout from "../css/layout.module.css";
import btnStyles from "../css/buttons.module.css";
import header from "../css/header.module.css";
import nav from "../css/nav.module.css";
import styles from "../css/signIn.module.css";

function CreatePlan() {
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
          "+1.5"
        );
    }, staggerAnimationContainer);

    return () => ctx.revert();
  }, []);

  const [exerciseData, setExerciseData] = useState({
    planName: "",
    routine: "fullbody",
    volume: 30,
  });
  const { planName, routine, volume } = exerciseData;

  const [fullbodyExercises, setFullbodyExercises] = useState([]);
  const [upperExercises, setUpperExercises] = useState([]);
  const [lowerExercises, setLowerExercises] = useState([]);
  const [pushExercises, setPushExercises] = useState([]);
  const [pullExercises, setPullExercises] = useState([]);
  const [legsExercises, setLegsExercises] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activeRoutine = useRef();
  const activeVolume = useRef();

  useEffect(() => {
    dispatch(getExercises());
  }, [dispatch]);

  useEffect(() => {
    if (activeRoutine.current.value === "fullbody") {
      activeRoutine.current.checked = true;
    } else {
      activeRoutine.current.checked = false;
    }

    if (activeVolume.current.value === "30") {
      activeVolume.current.checked = true;
    } else {
      activeVolume.current.checked = false;
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const exercisesToPush = {};

    if (routine === "fullbody") exercisesToPush["Fullbody"] = fullbodyExercises;

    if (routine === "a/b split") {
      exercisesToPush["Upper Split"] = upperExercises;
      exercisesToPush["Lower Split"] = lowerExercises;
    }
    if (routine === "ppl") {
      exercisesToPush["Push Split"] = pushExercises;
      exercisesToPush["Pull Split"] = pullExercises;
      exercisesToPush["Legs Split"] = legsExercises;
    }

    const plan = {
      planName: planName,
      routine: routine,
      volume: volume,
      exercises: exercisesToPush,
    };

    dispatch(createPlan(plan));
    navigate("/plans");
  };

  const onClick = (e) => {
    setExerciseData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onChange = (e) => {
    setExerciseData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <>
      <section className={layout.content__wrapper}>
        <form
          ref={staggerAnimationContainer}
          style={{ gap: "2.5rem" }}
          onSubmit={onSubmit}
          className={`${styles.form} ${layout.threeRow__grid__layout}`}
        >
          <nav ref={navContainer} className={nav.nav}>
            <Link to="/plans">
              <span className={nav.arrow__link}>←</span>
            </Link>
          </nav>
          <div className={styles.form__inner}>
            <header className={header.header}>
              <h2 className={`${header.heading__h2} ${"animate__item"}`}>Routine type</h2>
              <p
                style={{ maxWidth: "unset" }}
                className={`${header.subheading} ${"animate__item"}`}
              >
                Choose routine type for your plan.
              </p>
            </header>
            <div className={styles.input__wrapper}>
              <div className={`${styles.form__group} ${"animate__item--input"}`}>
                <div className={`${styles.form__control}`}>
                  <span>Full Body</span>
                </div>
                <input
                  ref={activeRoutine}
                  onClick={onClick}
                  type="radio"
                  value="fullbody"
                  name="routine"
                  className={styles.form__control__radio}
                />
                <div className={styles.gradient__stroke}></div>
                <div className={styles.selected}>selected</div>
              </div>
              <div className={`${styles.form__group} ${"animate__item--input"}`}>
                <div className={`${styles.form__control}`}>
                  <span>A/B Split</span>
                </div>
                <input
                  onClick={onClick}
                  type="radio"
                  value="a/b split"
                  name="routine"
                  className={styles.form__control__radio}
                />
                <div className={styles.gradient__stroke}></div>
                <div className={styles.selected}>selected</div>
              </div>
              <div className={`${styles.form__group} ${"animate__item--input"}`}>
                <div className={`${styles.form__control}`}>
                  <span>PPL</span>
                </div>
                <input
                  onClick={onClick}
                  type="radio"
                  value="ppl"
                  name="routine"
                  className={styles.form__control__radio}
                />
                <div className={styles.gradient__stroke}></div>
                <div className={styles.selected}>selected</div>
              </div>
            </div>
            <div className={styles.clarification}>
              <p
                style={{ maxWidth: "unset", margin: "var(--gap-children 0" }}
                className={`${header.subheading} ${"animate__item"}`}
              >
                A/B Split - alternate between upper and lower muscles groups.
              </p>
              <p
                style={{ maxWidth: "unset", margin: "var(--gap-children 0" }}
                className={`${header.subheading} ${"animate__item"}`}
              >
                PPL - rotate through push, pull and legs workouts.
              </p>
            </div>
          </div>
          <div className={styles.form__inner}>
            <header className={header.header}>
              <h2 className={`${header.heading__h2} ${"animate__item"}`}>Volume</h2>
              <p
                style={{ maxWidth: "unset" }}
                className={`${header.subheading} ${"animate__item"}`}
              >
                Choose volume for your plan.
              </p>
            </header>
            <div className={styles.input__wrapper}>
              <div className={`${styles.form__group} ${"animate__item--input"}`}>
                <div className={`${styles.form__control}`}>
                  <span>30</span>
                </div>
                <input
                  ref={activeVolume}
                  onClick={onClick}
                  type="radio"
                  value={30}
                  name="volume"
                  className={styles.form__control__radio}
                />
                <div className={styles.gradient__stroke}></div>
                <div className={styles.selected}>selected</div>
              </div>
              <div className={`${styles.form__group} ${"animate__item--input"}`}>
                <div className={`${styles.form__control}`}>
                  <span>40</span>
                </div>
                <input
                  onClick={onClick}
                  type="radio"
                  value={40}
                  name="volume"
                  className={styles.form__control__radio}
                />
                <div className={styles.gradient__stroke}></div>
                <div className={styles.selected}>selected</div>
              </div>
              <div className={`${styles.form__group} ${"animate__item--input"}`}>
                <div className={`${styles.form__control}`}>
                  <span>50</span>
                </div>
                <input
                  onClick={onClick}
                  type="radio"
                  value={50}
                  name="volume"
                  className={styles.form__control__radio}
                />
                <div className={styles.gradient__stroke}></div>
                <div className={styles.selected}>selected</div>
              </div>
            </div>
          </div>
          <div className={styles.form__inner}>
            {routine === "fullbody" && (
              <FullbodySplit
                setFullbodyExercises={setFullbodyExercises}
                fullbodyExercises={fullbodyExercises}
              />
            )}
            {routine === "a/b split" && (
              <ABSPlit
                setUpperExercises={setUpperExercises}
                setLowerExercises={setLowerExercises}
                lowerExercises={lowerExercises}
                upperExercises={upperExercises}
              />
            )}
            {routine === "ppl" && (
              <PPLSplit
                setPushExercises={setPushExercises}
                setPullExercises={setPullExercises}
                setLegsExercises={setLegsExercises}
                pushExercises={pushExercises}
                pullExercises={pullExercises}
                legsExercises={legsExercises}
              />
            )}
          </div>
          <div className={styles.form__inner}>
            <header className={header.header}>
              <h2 className={`${header.heading__h2} ${"animate__item"}`}>Name your plan!</h2>
            </header>
            <div className={styles.input__wrapper}>
              <div className={`${styles.form__group} ${"animate__item--input"}`}>
                <input
                  type="text"
                  className={styles.form__control}
                  id="planName"
                  name="planName"
                  value={planName}
                  onChange={onChange}
                  placeholder="Plan name"
                />
                <div className={styles.gradient__stroke}></div>
              </div>
            </div>
          </div>
          <div ref={buttons} className={btnStyles.btns__row}>
            <button type="submit" className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}>
              <span>create plan</span>
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default CreatePlan;
