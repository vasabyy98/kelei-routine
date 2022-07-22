import React from "react";

import styles from "./exerciseList.module.css";

export default function ExerciseList({ exercises, massUnit, removeExercise }) {
  return (
    <>
      {exercises.length > 0 && (
        <section className={styles.exercise__wrapper}>
          {exercises.map((exercise, index) => (
            <div
              onClick={removeExercise}
              className={styles.exercise__inner}
              key={index}
              name={exercise.exercise}
            >
              <div className={styles.spacerTop}></div>
              {exercise.exercise} / {exercise.weight}
              {massUnit}
              <div className={styles.spacerBottom}></div>
            </div>
          ))}
        </section>
      )}
    </>
  );
}
