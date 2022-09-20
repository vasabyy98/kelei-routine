import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import Header from "../header/Header";

import styles from "../addedExercises/exerciseList.module.css";
import layout from "../../css/layout.module.css";
import btnStyles from "../../css/buttons.module.css";

function ChooseExercise() {
  const navigate = useNavigate();

  const selectedPlan = useSelector((state) => state.selectedPlan);
  const [selectedExercises, setExercises] = useState(null);

  useEffect(() => {
    setExercises(selectedPlan[selectedPlan.selectedWorkout]);

    selectedPlan.selectedWorkout === "" && navigate("/home");
  }, [selectedExercises]);

  return (
    <>
      <section className={layout.content__wrapper}>
        <div className={layout.twoRow__grid__layout}>
          <div className={layout.flex__layout}>
            <Header line1="choose" line2="exercise" />
            {selectedExercises !== null && (
              <section className={styles.exercise__wrapper}>
                {selectedExercises.map((exercise, index) => (
                  <div className={styles.exercise__inner} key={index} name={exercise.exercise}>
                    <div className={styles.spacerTop}></div>
                    {exercise.exercise} / {exercise.currentWeight}
                    {selectedPlan.massUnit}
                    <div className={styles.spacerBottom}></div>
                  </div>
                ))}
              </section>
            )}
          </div>
          <div className={btnStyles.btns__row}>
            <Link to="/choose-workout" className={`${btnStyles.btn} ${btnStyles.secondaryBtn}`}>
              <span>go back</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default ChooseExercise;
