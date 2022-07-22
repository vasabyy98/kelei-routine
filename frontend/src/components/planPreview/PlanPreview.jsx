import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import layout from "../../css/layout.module.css";
import styles from "./planPreview.module.css";
import btnStyles from "../../css/buttons.module.css";
import changeThis from "../addExerciseForm/exerciseForm.module.css";

import Header from "../header/Header";
import NamePlan from "../namePlan/NamePlan";

function PlanPreview({
  addExercisesSection,
  exercises,
  massUnit,
  routineType,
  routineVolume,
  showPreview,
  setShowPreview,
  previewSection,
  setShowNamePlan,
  namePlanSection,
  showNamePlan,
}) {
  useEffect(() => {
    if (showPreview) {
      previewSection.current.classList.add(layout.visible);
      addExercisesSection.current.classList.add(changeThis.hide);
    } else {
      previewSection.current.classList.remove(layout.visible);
      addExercisesSection.current.classList.remove(changeThis.hide);
    }
  }, [showPreview]);
  return (
    <>
      <section ref={previewSection} className={`${layout.content__wrapper__bg} ${layout.hidden}`}>
        <div className={layout.twoRow__grid__layout}>
          <div className={styles.preview}>
            <Header routineType={"#" + routineType} routineVolume={"#" + routineVolume + " reps"} />
            {exercises.length > 0 && (
              <div className={styles.preview__items}>
                {exercises.map((exercise, index) => (
                  <div key={exercise.exercise + index} className={styles.preview__item}>
                    <div className={styles.spacerTop}></div>
                    <div>
                      {exercise.exercise} / {exercise.weight}
                      {massUnit}
                    </div>
                    <div className={styles.spacerBottom}></div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ marginBottom: "var(--padding)" }} className={`${btnStyles.btns__row} `}>
            <button
              onClick={() => setShowPreview(false)}
              className={`${btnStyles.btn} ${btnStyles.secondaryBtn} ${btnStyles.arrowBtn}`}
            >
              <span>go back</span>
            </button>
            <button
              onClick={() => setShowNamePlan(true)}
              className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}
            >
              <span>looks solid!</span>
            </button>
          </div>
        </div>
      </section>
      <NamePlan
        namePlanSection={namePlanSection}
        addExercisesSection={addExercisesSection}
        exercises={exercises}
        massUnit={massUnit}
        routineType={routineType}
        routineVolume={routineVolume}
        showNamePlan={showNamePlan}
        setShowNamePlan={setShowNamePlan}
      />
    </>
  );
}

export default PlanPreview;
