import React, { useState, useRef, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { createExercise } from "../features/exercises/exerciseSlice";

import layout from "../css/layout.module.css";
import btnStyles from "../css/buttons.module.css";
import header from "../css/header.module.css";
import nav from "../css/nav.module.css";
import styles from "../css/signIn.module.css";

function CreateExercise() {
  const [exerciseData, setExerciseData] = useState({
    exerciseName: "",
    weight: "",
    rm: "8-12RM",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const active = useRef();

  useEffect(() => {
    if (active.current.value === "8-12RM") {
      active.current.checked = true;
    } else {
      active.current.checked = false;
    }
  }, [rm]);

  const { exerciseName, weight, rm } = exerciseData;

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
          <nav className={nav.nav}>
            <Link to="/exercises">
              <span className={nav.arrow__link}>←</span>
            </Link>
          </nav>
          <div className={styles.form__inner}>
            <header className={header.header}>
              <h2 className={header.heading__h2}>Create new exercise</h2>
              <p style={{ maxWidth: "unset" }} className={header.subheading}>
                Set exercise name, weight and choose the repetition range.
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
              <div className={styles.form__group}>
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
              <div className={styles.form__group}>
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
              <div className={styles.form__group}>
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
              <div className={styles.form__group}>
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
              className={header.subheading}
            >
              RM - repetitions max with N weight.
            </p>
          </div>
          <div className={btnStyles.btns__row}>
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
