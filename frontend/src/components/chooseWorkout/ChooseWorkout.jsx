import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePlan } from "../../features/plans/planSlice";

import { Link, useNavigate } from "react-router-dom";

import { setSelectedWorkout } from "../../features/plans/selectedPlanSlice";

import layout from "../../css/layout.module.css";
import styles from "../addedExercises/exerciseList.module.css";
import btnStyles from "../../css/buttons.module.css";

import Header from "../header/Header";

function ChooseWorkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedPlan = useSelector((state) => state.selectedPlan);

  useEffect(() => {
    selectedPlan._id === "" && navigate("/home");
  });

  const onClick = (e) => {
    dispatch(setSelectedWorkout(e.currentTarget.attributes.routinetype.value));
    navigate("/choose-exercise");
  };

  const deleteSelectedPlan = () => {
    dispatch(deletePlan(selectedPlan._id));
    navigate("/home");
  };
  return (
    <>
      <section className={`${layout.content__wrapper__bg} `}>
        <div className={layout.twoRow__grid__layout}>
          <div className={layout.flex__layout}>
            <Header line1={selectedPlan.name} />
            <section className={styles.exercise__wrapper}>
              {selectedPlan.routine === "full body" && (
                <div onClick={onClick} routinetype="fullbody" className={styles.exercise__inner}>
                  <div className={styles.spacerTop}></div>
                  full body
                  <div className={styles.spacerBottom}></div>
                </div>
              )}
              {selectedPlan.routine === "a/b split" && (
                <>
                  <div
                    onClick={onClick}
                    routinetype="upperSplit"
                    className={styles.exercise__inner}
                  >
                    <div className={styles.spacerTop}></div>
                    upper split
                    <div className={styles.spacerBottom}></div>
                  </div>
                  <div
                    onClick={onClick}
                    routinetype="lowerSplit"
                    className={styles.exercise__inner}
                  >
                    <div className={styles.spacerTop}></div>
                    lower split
                    <div className={styles.spacerBottom}></div>
                  </div>
                </>
              )}
              {selectedPlan.routine === "ppl" && (
                <>
                  <div onClick={onClick} routinetype="pushDay" className={styles.exercise__inner}>
                    <div className={styles.spacerTop}></div>
                    push day
                    <div className={styles.spacerBottom}></div>
                  </div>
                  <div onClick={onClick} routinetype="pullDay" className={styles.exercise__inner}>
                    <div className={styles.spacerTop}></div>
                    pull day
                    <div className={styles.spacerBottom}></div>
                  </div>
                  <div onClick={onClick} routinetype="legsDay" className={styles.exercise__inner}>
                    <div className={styles.spacerTop}></div>
                    legs day
                    <div className={styles.spacerBottom}></div>
                  </div>
                </>
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
            <Link to="/home" className={`${btnStyles.btn} ${btnStyles.secondaryBtn}`}>
              <span>go back</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default ChooseWorkout;
