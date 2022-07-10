import React from "react";

import layout from "./exerciseList.module.css";

export default function ExerciseList({ exercises, massUnit, removeExercise }) {
  return (
    <>
      {exercises.length > 0 && (
        <section className={layout.exercise__wrapper}>
          {exercises.map((exercise, index) => (
            <div
              onClick={removeExercise}
              className={layout.exercise__inner}
              key={index}
              name={exercise.exercise}
            >
              <div className={layout.exercise__name}>{exercise.exercise} </div>
              <div className={layout.exercise__weight}>
                <span>
                  {exercise.weight}
                  {massUnit}
                </span>
              </div>
            </div>
          ))}
        </section>
      )}
    </>
  );
}
