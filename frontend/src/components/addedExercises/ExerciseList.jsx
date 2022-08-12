import React from "react";

import styles from "./exerciseList.module.css";

export default function ExerciseList({ fullbodyExercises, massUnit, removeExercise }) {
  return (
    <>
      {fullbodyExercises.length > 0 && (
        <section className={styles.exercise__wrapper}>
          {fullbodyExercises.map((exercise, index) => (
            <div
              onClick={removeExercise}
              className={styles.exercise__inner}
              key={index}
              name={exercise.exercise}
            >
              <div className={styles.spacerTop}></div>
              {exercise.exercise} / {exercise.currentWeight}
              {massUnit}
              <div className={styles.spacerBottom}></div>
            </div>
          ))}
        </section>
      )}
    </>
  );
}
