import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { updateExercise } from "../features/exercises/exerciseToChangeSlice";
import { setExerciseCompleted } from "../features/exercises/completedExerciseSlice";

import layout from "../css/layout.module.css";
import styles from "../css/exercise.module.css";
import btnStyles from "../css/buttons.module.css";
import header from "../css/header.module.css";
import nav from "../css/nav.module.css";

function RepCounter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allExercises = useSelector((state) => state.exercises.exercises);
  const selectedExercise = useSelector((state) => state.chosenSplit.exercise);
  const chosenPlanVolume = useSelector((state) => state.chosenPlan.volume);

  let splitExercise;

  const [AVGRestTime, setAVGRestTime] = useState(0);
  const [completedReps, setCompletedReps] = useState(0);

  const [currentSet, setCurrentSet] = useState(1);
  const [currentReps, setCurrentReps] = useState(0);
  const [currentRest, setCurrentRest] = useState(0);
  const [timerIsRunning, setTimer] = useState(false);
  const [intervalId, setIntervalId] = useState(0);

  allExercises.forEach((exercise) => {
    if (exercise._id === selectedExercise) {
      splitExercise = exercise;
    }
  });

  useEffect(() => {
    if (completedReps >= chosenPlanVolume) {
      onFinish();
    }
  }, [completedReps]);

  const addRep = () => {
    if (timerIsRunning === false) {
      startTimer();
      setTimer(true);
    }

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

  const startTimer = () => {
    if (timerIsRunning === false) {
      setIntervalId(
        setInterval(() => {
          setCurrentRest((rest) => {
            return rest + 1;
          });
        }, 1000)
      );
    }
  };

  const stopTimer = () => {
    clearInterval(intervalId);
    setIntervalId(0);
  };

  const nextSetHandler = () => {
    if (timerIsRunning) {
      stopTimer();
      setTimer(false);

      setCompletedReps((completed) => {
        return completed + currentReps;
      });

      setCurrentReps(0);

      if (currentSet === 1) {
        setAVGRestTime((rest) => {
          return rest + currentRest;
        });
      } else {
        setAVGRestTime((rest) => {
          return (rest + currentRest) / 2;
        });
      }

      setCurrentRest(0);
      setCurrentSet((set) => {
        return set + 1;
      });
    }
  };

  const onFinish = () => {
    const exerciseData = {
      restTime: AVGRestTime,
    };

    const id = selectedExercise;

    dispatch(setExerciseCompleted(id));

    dispatch(updateExercise({ id, exerciseData }));
    navigate("/choose-exercise");
  };

  return (
    <>
      <section className={layout.content__wrapper}>
        <div className={` ${layout.threeRow__grid__layout}`}>
          <nav className={nav.nav}>
            <Link to="/choose-exercise">
              <span className={nav.arrow__link}>←</span>
            </Link>
          </nav>
          <div className={layout.flex__layout}>
            <div className={`${layout.flex__layout} ${styles.exercises__wrapper}`}>
              <header className={header.header}>
                <h2 className={header.heading__h2}>{splitExercise.exerciseName}</h2>
              </header>
              <div className={`${styles.exercise__details__wrapper} ${styles.show}`}>
                <div className={styles.exercise__details}>
                  <div className={styles.exercise__inner}>
                    <span>Average rest time:</span>
                    <span style={{ textTransform: "capitalize" }}>
                      {AVGRestTime}
                      <span style={{ textTransform: "uppercase" }}>sec</span>
                    </span>
                  </div>
                  <div className={styles.exercise__inner}>
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
                  <div className={styles.exercise__inner}>
                    <span>Current set:</span>
                    <span style={{ textTransform: "capitalize" }}>{currentSet}</span>
                  </div>
                  <div className={styles.exercise__inner}>
                    <span>Current reps:</span>
                    <span style={{ textTransform: "capitalize" }}>{currentReps}</span>
                  </div>
                  <div className={styles.exercise__inner}>
                    <span>Rest timer:</span>
                    <span style={{ textTransform: "capitalize" }}>
                      {currentRest}
                      <span style={{ textTransform: "uppercase" }}>sec</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className={btnStyles.btns__col}>
                <button
                  onClick={substractRep}
                  className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}
                >
                  <span>substract rep</span>
                </button>
                <button onClick={addRep} className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}>
                  <span>add rep</span>
                </button>
              </div>
            </div>
          </div>
          <div className={btnStyles.btns__col}>
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
