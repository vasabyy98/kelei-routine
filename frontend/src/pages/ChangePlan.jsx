import React, { useState, useRef, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getExercises } from "../features/exercises/exerciseSlice";
import { updatePlan, resetChosenPlan } from "../features/plans/planToChangeSlice";

import layout from "../css/layout.module.css";
import btnStyles from "../css/buttons.module.css";
import header from "../css/header.module.css";
import nav from "../css/nav.module.css";
import styles from "../css/signIn.module.css";

function ChangePlan() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { exercises } = useSelector((state) => state.exercises);
  const chosenPlan = useSelector((state) => state.chosenPlan);

  const [selectedExercises, setSelectedExercises] = useState([]);
  const [planData, setPlanData] = useState({
    planName: chosenPlan.planName,
    routine: chosenPlan.routine,
    volume: chosenPlan.volume,
  });

  const { planName, routine, volume } = planData;

  const firstRoutine = useRef();
  const secondRoutine = useRef();
  const thirdRoutine = useRef();

  const firstVolume = useRef();
  const secondVolume = useRef();
  const thirdVolume = useRef();

  // const exerciseId = [];

  // exercises.forEach((exercise) => {
  //   exerciseId.push(exercise._id);
  // });

  // const chosenExercisesId = [];

  // chosenPlan.exercises.forEach((exercise) => {
  //   chosenExercisesId.push(exercise._id);
  // });

  // console.log(chosenPlan.exercises[0]);

  useEffect(() => {
    if (chosenPlan.planName === "") {
      navigate("/plans");
    }

    [firstRoutine, secondRoutine, thirdRoutine].forEach((routine) => {
      if (routine.current.value === chosenPlan.routine) {
        routine.current.checked = true;
      }
    });

    [firstVolume, secondVolume, thirdVolume].forEach((volume) => {
      if (+volume.current.value === chosenPlan.volume) {
        volume.current.checked = true;
      }
    });
  }, [chosenPlan]);

  useEffect(() => {
    dispatch(getExercises());
  }, [dispatch]);

  const onChange = (e) => {
    setPlanData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const plan = {
      planName: planName,
      routine: routine,
      volume: volume,
      exercises: selectedExercises,
    };

    const id = chosenPlan.plan_id;

    dispatch(updatePlan({ id, plan }));
    dispatch(resetChosenPlan());
    navigate("/plans");
  };
  const onClick = (e) => {
    setPlanData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleCheckboxChange = (e) => {
    if (e.target.checked === true) {
      setSelectedExercises([...selectedExercises, e.target.value]);
    } else {
      setSelectedExercises([
        ...selectedExercises.filter((exercise) => exercise !== e.target.value),
      ]);
    }
  };

  return (
    <>
      <section className={layout.content__wrapper}>
        <form onSubmit={onSubmit} className={`${styles.form} ${layout.threeRow__grid__layout}`}>
          <nav className={nav.nav}>
            <Link to="/plans">
              <span className={nav.arrow__link}>←</span>
            </Link>
          </nav>
          <div className={styles.form__inner}>
            <header className={header.header}>
              <h2 className={header.heading__h2}>Routine type</h2>
              <p style={{ maxWidth: "unset" }} className={header.subheading}>
                Choose routine type for your plan.
              </p>
            </header>
            <div className={styles.input__wrapper}>
              <div className={styles.form__group}>
                <div className={`${styles.form__control}`}>
                  <span>Full Body</span>
                </div>
                <input
                  ref={firstRoutine}
                  onClick={onClick}
                  type="radio"
                  value="fullbody"
                  name="routine"
                  className={styles.form__control__radio}
                />
                <div className={styles.gradient__stroke}></div>
                <div className={styles.selected}>selected</div>
              </div>
              <div className={styles.form__group}>
                <div className={`${styles.form__control}`}>
                  <span>A/B Split</span>
                </div>
                <input
                  ref={secondRoutine}
                  onClick={onClick}
                  type="radio"
                  value="a/b split"
                  name="routine"
                  className={styles.form__control__radio}
                />
                <div className={styles.gradient__stroke}></div>
                <div className={styles.selected}>selected</div>
              </div>
              <div className={styles.form__group}>
                <div className={`${styles.form__control}`}>
                  <span>PPL</span>
                </div>
                <input
                  ref={thirdRoutine}
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
                className={header.subheading}
              >
                A/B Split - alternate between upper and lower muscles groups.
              </p>
              <p
                style={{ maxWidth: "unset", margin: "var(--gap-children 0" }}
                className={header.subheading}
              >
                PPL - rotate through push, pull and legs workouts.
              </p>
            </div>
          </div>
          <div className={styles.form__inner}>
            <header className={header.header}>
              <h2 className={header.heading__h2}>Volume</h2>
              <p style={{ maxWidth: "unset" }} className={header.subheading}>
                Choose volume for your plan.
              </p>
            </header>
            <div className={styles.input__wrapper}>
              <div className={styles.form__group}>
                <div className={`${styles.form__control}`}>
                  <span>30</span>
                </div>
                <input
                  ref={firstVolume}
                  onClick={onClick}
                  type="radio"
                  value={30}
                  name="volume"
                  className={styles.form__control__radio}
                />
                <div className={styles.gradient__stroke}></div>
                <div className={styles.selected}>selected</div>
              </div>
              <div className={styles.form__group}>
                <div className={`${styles.form__control}`}>
                  <span>40</span>
                </div>
                <input
                  ref={secondVolume}
                  onClick={onClick}
                  type="radio"
                  value={40}
                  name="volume"
                  className={styles.form__control__radio}
                />
                <div className={styles.gradient__stroke}></div>
                <div className={styles.selected}>selected</div>
              </div>
              <div className={styles.form__group}>
                <div className={`${styles.form__control}`}>
                  <span>50</span>
                </div>
                <input
                  ref={thirdVolume}
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
            <header className={header.header}>
              <h2 className={header.heading__h2}>Choose full body exercises</h2>
            </header>
            <div className={styles.input__wrapper}>
              {exercises.map((exercise) => (
                <div key={exercise._id} className={styles.form__group}>
                  <div className={`${styles.form__control}`}>
                    <span>{exercise.exerciseName}</span>
                  </div>
                  <input
                    onClick={handleCheckboxChange}
                    type="checkbox"
                    value={exercise._id}
                    name="selectedExercises"
                    className={styles.form__control__radio}
                  />
                  <div className={styles.gradient__stroke}></div>
                  <div className={styles.selected}>selected</div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.form__inner}>
            <header className={header.header}>
              <h2 className={header.heading__h2}>Name your plan!</h2>
            </header>
            <div className={styles.input__wrapper}>
              <div className={styles.form__group}>
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
          <div className={btnStyles.btns__row}>
            <button type="submit" className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}>
              <span>change plan</span>
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default ChangePlan;
