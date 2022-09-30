import React from "react";
import { useSelector } from "react-redux";

import header from "../../css/header.module.css";
import styles from "../../css/signIn.module.css";

function ABSPlit({ setUpperExercises, setLowerExercises, lowerExercises, upperExercises }) {
  const { exercises } = useSelector((state) => state.exercises);

  const handleCheckboxChangeUpper = (e) => {
    if (e.target.checked === true) {
      setUpperExercises([...upperExercises, e.target.value]);
    } else {
      setUpperExercises([...upperExercises.filter((exercise) => exercise !== e.target.value)]);
    }
  };
  const handleCheckboxChangeLower = (e) => {
    if (e.target.checked === true) {
      setLowerExercises([...lowerExercises, e.target.value]);
    } else {
      setLowerExercises([...lowerExercises.filter((exercise) => exercise !== e.target.value)]);
    }
  };
  return (
    <>
      <div className={styles.form__inner}>
        <header className={header.header}>
          <h2 className={header.heading__h2}>Choose upper body exercises</h2>
        </header>
        <div className={styles.exercise__wrapper}>
          {exercises.map((exercise) => (
            <div key={exercise._id} className={styles.form__group}>
              <div className={`${styles.form__control}`}>
                <span>{exercise.exerciseName}</span>
              </div>
              <input
                onClick={handleCheckboxChangeUpper}
                type="checkbox"
                value={exercise._id}
                name="upperExercises"
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
          <h2 className={header.heading__h2}>Choose lower body exercises</h2>
        </header>
        <div className={styles.exercise__wrapper}>
          {exercises.map((exercise) => (
            <div key={exercise._id} className={styles.form__group}>
              <div className={`${styles.form__control}`}>
                <span>{exercise.exerciseName}</span>
              </div>
              <input
                onClick={handleCheckboxChangeLower}
                type="checkbox"
                value={exercise._id}
                name="lowerExercises"
                className={styles.form__control__radio}
              />
              <div className={styles.gradient__stroke}></div>
              <div className={styles.selected}>selected</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ABSPlit;
