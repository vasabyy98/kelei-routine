import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deletePlan } from "../../features/plans/planSlice";

import layout from "../../css/layout.module.css";
import changeThis from "../addExerciseForm/exerciseForm.module.css";
import styles from "../addedExercises/exerciseList.module.css";
import btnStyles from "../../css/buttons.module.css";

import Header from "../header/Header";

function ChooseWorkout({
  homeSection,
  requestedPlan,
  showWorkout,
  setShowWorkout,
  chooseWorkoutSection,
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (showWorkout) {
      chooseWorkoutSection.current.classList.add(layout.visible);
      homeSection.current.classList.add(changeThis.hide);
    } else if (showWorkout === false) {
      chooseWorkoutSection.current.classList.remove(layout.visible);
      homeSection.current.classList.remove(changeThis.hide);
    }
  }, [showWorkout]);

  const deleteSelectedPlan = () => {
    dispatch(deletePlan(requestedPlan._id));
    setShowWorkout(false);
  };
  return (
    <>
      <section
        ref={chooseWorkoutSection}
        className={`${layout.content__wrapper__bg} ${layout.hidden}`}
      >
        <div className={layout.twoRow__grid__layout}>
          <div className={layout.flex__layout}>
            <Header line1={requestedPlan.name} />
            <section className={styles.exercise__wrapper}>
              {requestedPlan.routine === "full body" ? (
                <div className={styles.exercise__inner}>
                  <div className={styles.spacerTop}></div>
                  full body
                  <div className={styles.spacerBottom}></div>
                </div>
              ) : (
                <></>
              )}
              {requestedPlan.routine === "a/b split" ? (
                <>
                  <div className={styles.exercise__inner}>
                    <div className={styles.spacerTop}></div>
                    upper split
                    <div className={styles.spacerBottom}></div>
                  </div>
                  <div className={styles.exercise__inner}>
                    <div className={styles.spacerTop}></div>
                    lower split
                    <div className={styles.spacerBottom}></div>
                  </div>
                </>
              ) : (
                <></>
              )}
              {requestedPlan.routine === "ppl" ? (
                <>
                  <div className={styles.exercise__inner}>
                    <div className={styles.spacerTop}></div>
                    push day
                    <div className={styles.spacerBottom}></div>
                  </div>
                  <div className={styles.exercise__inner}>
                    <div className={styles.spacerTop}></div>
                    pull day
                    <div className={styles.spacerBottom}></div>
                  </div>
                  <div className={styles.exercise__inner}>
                    <div className={styles.spacerTop}></div>
                    legs day
                    <div className={styles.spacerBottom}></div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </section>
            <div className={`${btnStyles.btns__row}`}>
              <button
                onClick={deleteSelectedPlan}
                className={`${btnStyles.btn} ${btnStyles.deleteBtn} `}
                styles={{ background: "red", color: "black" }}
              >
                <span>delete</span>
              </button>
              <button className={`${btnStyles.btn} ${btnStyles.secondaryBtn}`}>
                <span>edit</span>
              </button>
              <button className={`${btnStyles.btn} ${btnStyles.secondaryBtn}`}>
                <span>stats</span>
              </button>
            </div>
          </div>
          <div className={btnStyles.btns__row}>
            <button
              onClick={() => setShowWorkout(false)}
              className={`${btnStyles.btn} ${btnStyles.secondaryBtn}`}
            >
              <span>go back</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default ChooseWorkout;
