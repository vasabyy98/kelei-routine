import React from "react";
import { useSelector } from "react-redux";

import header from "../../css/header.module.css";
import styles from "../../css/signIn.module.css";

function FullbodySplit({ setFullbodyExercises, fullbodyExercises }) {
  const { exercises } = useSelector((state) => state.exercises);

  const handleCheckboxChange = (e) => {
    if (e.target.checked === true) {
      setFullbodyExercises([...fullbodyExercises, e.target.value]);
    } else {
      setFullbodyExercises([
        ...fullbodyExercises.filter((exercise) => exercise !== e.target.value),
      ]);
    }
  };
  return (
    <>
      <div className={styles.form__inner}>
        <header className={header.header}>
          <h2 className={header.heading__h2}>Choose full body exercises</h2>
        </header>
        <div className={styles.exercise__wrapper}>
          {exercises.map((exercise) => (
            <div key={exercise._id} className={styles.form__group}>
              <div className={`${styles.form__control}`}>
                <span>{exercise.exerciseName}</span>
              </div>
              <input
                onClick={handleCheckboxChange}
                type="checkbox"
                value={exercise._id}
                name="fullbodyExercises"
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

export default FullbodySplit;
