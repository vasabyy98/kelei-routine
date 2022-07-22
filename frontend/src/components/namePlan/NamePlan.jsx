import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createWorkoutPlan } from "../../features/plans/planSlice";

import layout from "../../css/layout.module.css";
import changeThis from "../addExerciseForm/exerciseForm.module.css";
import styles from "../../css/signIn.module.css";
import btnStyles from "../../css/buttons.module.css";
import image from "../../css/backgroundImage.module.css";

function NamePlan({
  showNamePlan,
  namePlanSection,
  addExercisesSection,
  exercises,
  massUnit,
  routineType,
  routineVolume,
  setShowNamePlan,
}) {
  const [formData, setFormData] = useState({
    workoutName: "",
  });

  const { workoutName } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (showNamePlan) {
      namePlanSection.current.classList.add(layout.visible);
      addExercisesSection.current.classList.add(changeThis.hide);
    } else {
      namePlanSection.current.classList.remove(layout.visible);
      addExercisesSection.current.classList.remove(changeThis.hide);
    }
  }, [showNamePlan]);

  const createPlan = (e) => {
    e.preventDefault();

    const name = workoutName;
    const routine = routineType;
    const volume = routineVolume;

    exercises.forEach((el) => {
      el.weight += massUnit;
      el.stats = {
        initialWeight: el.weight,
        currentWeight: el.weight,
        avgRest: 0,
      };
    });

    dispatch(createWorkoutPlan({ name, exercises, routine, volume }));
    navigate("/home");
  };
  return (
    <>
      <section ref={namePlanSection} className={`${layout.content__wrapper__bg} ${layout.hidden}`}>
        <div className={image.backgroundImageNamePlan}></div>
        <div className={layout.twoRow__grid__layout}>
          <div className={layout.flex__layout}>
            <header className={styles.header}>
              <div className={styles.header__row}>
                <span className={styles.header__text}>
                  a<span className={styles.alternative}>l</span>most
                </span>
              </div>
              <div className={styles.header__row}>
                <span className={styles.header__text}>there</span>
              </div>
            </header>
            <form onSubmit={createPlan} className={`${styles.form} `}>
              <div className={styles.form__inner}>
                <div className={styles.form__group}>
                  <input
                    type="text"
                    className={styles.form__control}
                    id="workoutName"
                    name="workoutName"
                    value={workoutName}
                    onChange={onChange}
                    placeholder="workout name"
                  />
                  <div className={styles.spacer}></div>
                </div>
              </div>
              <div className={`${btnStyles.btns__row} ${btnStyles.absolute}`}>
                <button
                  onClick={(e) => {
                    e.preventDefault();

                    setShowNamePlan(false);
                  }}
                  className={`${btnStyles.btn} ${btnStyles.secondaryBtn} `}
                >
                  <span>go back</span>
                </button>
                <button type="submit" className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}>
                  <span>let's rock!</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default NamePlan;
