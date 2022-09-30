import React from "react";
import { useSelector } from "react-redux";

import header from "../../css/header.module.css";
import styles from "../../css/signIn.module.css";

function PPLSplit({
  setPushExercises,
  setPullExercises,
  setLegsExercises,
  pushExercises,
  pullExercises,
  legsExercises,
}) {
  const { exercises } = useSelector((state) => state.exercises);

  const handleCheckboxChangePush = (e) => {
    if (e.target.checked === true) {
      setPushExercises([...pushExercises, e.target.value]);
    } else {
      setPushExercises([...pushExercises.filter((exercise) => exercise !== e.target.value)]);
    }
  };
  const handleCheckboxChangePull = (e) => {
    if (e.target.checked === true) {
      setPullExercises([...pullExercises, e.target.value]);
    } else {
      setPullExercises([...pullExercises.filter((exercise) => exercise !== e.target.value)]);
    }
  };
  const handleCheckboxChangeLegs = (e) => {
    if (e.target.checked === true) {
      setLegsExercises([...legsExercises, e.target.value]);
    } else {
      setLegsExercises([...legsExercises.filter((exercise) => exercise !== e.target.value)]);
    }
  };
  return (
    <>
      <div className={styles.form__inner}>
        <header className={header.header}>
          <h2 className={header.heading__h2}>Choose push exercises</h2>
        </header>
        <div className={styles.exercise__wrapper}>
          {exercises.map((exercise) => (
            <div key={exercise._id} className={styles.form__group}>
              <div className={`${styles.form__control}`}>
                <span>{exercise.exerciseName}</span>
              </div>
              <input
                onClick={handleCheckboxChangePush}
                type="checkbox"
                value={exercise._id}
                name="pushExercises"
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
          <h2 className={header.heading__h2}>Choose pull exercises</h2>
        </header>
        <div className={styles.exercise__wrapper}>
          {exercises.map((exercise) => (
            <div key={exercise._id} className={styles.form__group}>
              <div className={`${styles.form__control}`}>
                <span>{exercise.exerciseName}</span>
              </div>
              <input
                onClick={handleCheckboxChangePull}
                type="checkbox"
                value={exercise._id}
                name="pullExercises"
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
          <h2 className={header.heading__h2}>Choose legs exercises</h2>
        </header>
        <div className={styles.exercise__wrapper}>
          {exercises.map((exercise) => (
            <div key={exercise._id} className={styles.form__group}>
              <div className={`${styles.form__control}`}>
                <span>{exercise.exerciseName}</span>
              </div>
              <input
                onClick={handleCheckboxChangeLegs}
                type="checkbox"
                value={exercise._id}
                name="legsExercises"
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

export default PPLSplit;
