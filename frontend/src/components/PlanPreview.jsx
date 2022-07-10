import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { createWorkoutPlan } from "../features/plans/planSlice";
import { useNavigate } from "react-router-dom";

import layout from "../css/layout.module.css";
import styles from "./planPreview.module.css";
import heading from "../css/signIn.module.css";
import btnStyles from "../css/buttons.module.css";

function PlanPreview({
  exercises,
  massUnit,
  routineType,
  routineVolume,
  showPreview,
  setShowPreview,
  previewSection,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (showPreview) {
      previewSection.current.classList.add(layout.visible);
    } else {
      previewSection.current.classList.remove(layout.visible);
    }
  }, [showPreview]);

  const createPlan = () => {
    const name = "kelei";
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
      <section ref={previewSection} className={`${layout.content__wrapper} ${layout.hidden}`}>
        <div className={layout.twoRow__grid__layout}>
          <div className={styles.preview}>
            <div className={styles.preview__item}>
              <header>
                <div className={heading.form__heading}>
                  <span>level</span>
                </div>
              </header>
              <span>custom</span>
            </div>
            <div className={styles.preview__item}>
              <header>
                <div className={heading.form__heading}>
                  <span>type of routine</span>
                </div>
              </header>
              <span>{routineType}</span>
            </div>
            <div className={styles.preview__item}>
              <header>
                <div className={heading.form__heading}>
                  <span>volume per exercise</span>
                </div>
              </header>
              <span>{routineVolume}</span>
            </div>
            <div className={styles.preview__item}>
              <header>
                <div className={heading.form__heading}>
                  <span>selected exercises</span>
                </div>
              </header>
              <div className={styles.items__wrapper}>
                {exercises.map((exercise, index) => (
                  <div key={exercise.exercise + index}>{exercise.exercise}</div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ marginBottom: "var(--padding)" }} className={`${btnStyles.btns__row} `}>
            <button
              onClick={() => setShowPreview(false)}
              className={`${btnStyles.btn} ${btnStyles.secondaryBtn} ${btnStyles.arrowBtn}`}
            >
              <span>←</span>
            </button>
            <button
              onClick={() => createPlan()}
              className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}
            >
              <span>looks solid</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default PlanPreview;
