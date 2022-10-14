import React, { useState, useRef, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { updateExercise, resetChosenExercise } from "../features/exercises/exerciseToChangeSlice";

import layout from "../css/layout.module.css";
import btnStyles from "../css/buttons.module.css";
import header from "../css/header.module.css";
import nav from "../css/nav.module.css";
import styles from "../css/signIn.module.css";

function ChangeExercise() {
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
          <nav className={nav.nav}>
            <Link to="/exercises">
              <span className={nav.arrow__link}>←</span>
            </Link>
          </nav>
          <div className={styles.form__inner}>
            <header className={header.header}>
              <h2 className={header.heading__h2}>Change exercise</h2>
              <p style={{ maxWidth: "unset" }} className={header.subheading}>
                Change exercise name and weight.
              </p>
            </header>
            <div className={styles.input__wrapper}>
              <div className={styles.form__group}>
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
              <div className={styles.form__group}>
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
            <p
              style={{ maxWidth: "unset", margin: "var(--gap-children 0" }}
              className={header.subheading}
            >
              RM - repetitions max with N weight.
            </p>
          </div>
          <div className={btnStyles.btns__row}>
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
