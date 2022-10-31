import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { setExerciseCompleted } from "../features/exercises/completedExerciseSlice";

import { gsap } from "gsap";

import layout from "../css/layout.module.css";
import styles from "../css/exercise.module.css";
import btnStyles from "../css/buttons.module.css";
import header from "../css/header.module.css";
import nav from "../css/nav.module.css";

function RepCounter() {
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
            stagger: 0.1,
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
          "+0.75"
        );
    }, staggerAnimationContainer);

    return () => ctx.revert();
  }, []);

  const actionContainer = useRef();
  const volumeAnimationNumber = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allExercises = useSelector((state) => state.exercises.exercises);
  const selectedExercise = useSelector((state) => state.chosenSplit.exercise);
  const chosenPlanVolume = useSelector((state) => state.chosenPlan.volume);

  let splitExercise;

  const [completedReps, setCompletedReps] = useState(0);

  const [currentSet, setCurrentSet] = useState(1);
  const [currentReps, setCurrentReps] = useState(0);

  allExercises.forEach((exercise) => {
    if (exercise._id === selectedExercise) {
      splitExercise = exercise;
    }
  });

  useEffect(() => {
    if (splitExercise === undefined) navigate("/plans");
  }, [splitExercise]);

  useEffect(() => {
    if (completedReps >= chosenPlanVolume) {
      actionContainer.current.classList.add(layout.action__container__visible);

      const ctx = gsap.context(() => {
        tl.current = gsap
          .timeline()
          .fromTo(
            ".animate__completed--volume",
            {
              opacity: 0,
              y: 25,
            },
            {
              y: 0,
              opacity: 1,
              duration: 1,
            },
            "+0.1"
          )
          .fromTo(
            ".animate__completed--msg",
            {
              opacity: 0,
              y: 25,
            },
            {
              y: 0,
              opacity: 1,
              duration: 1,
            },
            "+0.5"
          )
          .to(
            volumeAnimationNumber.current,
            {
              innerText: chosenPlanVolume,
              duration: 2,
              snap: {
                innerText: 1,
              },
              onComplete: () => {
                setTimeout(() => {
                  onFinish();
                }, 500);
              },
            },
            "+1"
          );
      }, actionContainer);
    }
  }, [completedReps]);

  const addRep = () => {
    setCurrentReps((currentReps) => {
      return currentReps + 1;
    });
  };

  const substractRep = () => {
    if (currentReps > 0) {
      setCurrentReps((currentReps) => {
        return currentReps - 1;
      });
    }
  };

  const nextSetHandler = () => {
    setCompletedReps((completed) => {
      return completed + currentReps;
    });

    setCurrentReps(0);
    setCurrentSet((set) => {
      return set + 1;
    });
  };

  const onFinish = () => {
    const id = selectedExercise;

    dispatch(setExerciseCompleted(id));
    navigate("/choose-exercise");
  };

  return (
    <>
      <section className={layout.content__wrapper}>
        <div ref={actionContainer} className={`${layout.flex__layout} ${layout.action__container}`}>
          <header style={{ alignItems: "center" }} className={header.header}>
            <h1
              style={{ opacity: 0 }}
              className={`${header.heading__h1} ${"animate__completed--volume"}`}
            >
              <span ref={volumeAnimationNumber}>0</span>/{chosenPlanVolume}
            </h1>
            <p
              style={{ maxWidth: "unset", opacity: 0 }}
              className={`${header.subheading} ${"animate__completed--msg"}`}
            >
              Exercise is completed!
            </p>
          </header>
        </div>
        <div className={` ${layout.threeRow__grid__layout}`}>
          <nav ref={navContainer} className={nav.nav}>
            <Link to="/choose-exercise">
              <span className={nav.arrow__link}>←</span>
            </Link>
            <Link to="/rep-counter-how-to">
              <span className={nav.text__link}>How to use?</span>
            </Link>
          </nav>
          <div ref={staggerAnimationContainer} className={layout.flex__layout}>
            <div className={`${layout.flex__layout} ${styles.exercises__wrapper}`}>
              <header className={header.header}>
                {splitExercise !== undefined && (
                  <h2 className={`${header.heading__h2} ${"animate__item"}`}>
                    {splitExercise.exerciseName}
                  </h2>
                )}
              </header>
              <div className={`${styles.exercise__details__wrapper} ${styles.show}`}>
                <div className={styles.exercise__details}>
                  <div className={`${styles.exercise__inner} ${"animate__item--input"}`}>
                    <span>Current weight:</span>
                    <span style={{ textTransform: "capitalize" }}>
                      {splitExercise.currentWeight}
                      <span style={{ textTransform: "uppercase" }}>KG</span>
                    </span>
                  </div>
                  <div className={`${styles.exercise__inner} ${"animate__item--input"}`}>
                    <span>Current set:</span>
                    <span style={{ textTransform: "capitalize" }}>{currentSet}</span>
                  </div>
                  <div className={`${styles.exercise__inner} ${"animate__item--input"}`}>
                    <span>Completed reps:</span>
                    <span style={{ textTransform: "capitalize" }}>
                      {completedReps}
                      <span style={{ textTransform: "uppercase" }}>/{chosenPlanVolume}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className={`${styles.exercise__details__wrapper} ${styles.show}`}>
                <div className={styles.exercise__details}>
                  <div className={`${styles.reps__wrapper} ${"animate__item--input"}`}>
                    <button
                      onClick={substractRep}
                      className={`${btnStyles.btn} ${btnStyles.arrow__btn} ${btnStyles.primaryBtn}`}
                    >
                      <span>-</span>
                    </button>
                    <div className={styles.exercise__reps}>{currentReps}</div>
                    <button
                      onClick={addRep}
                      className={`${btnStyles.btn} ${btnStyles.arrow__btn} ${btnStyles.primaryBtn}`}
                    >
                      <span>+</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div ref={buttons} className={btnStyles.btns__col}>
            <button onClick={onFinish} className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}>
              <span>finish</span>
            </button>
            <button
              onClick={nextSetHandler}
              className={`${btnStyles.btn} ${btnStyles.secondaryBtn}`}
            >
              <span>next set</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default RepCounter;
