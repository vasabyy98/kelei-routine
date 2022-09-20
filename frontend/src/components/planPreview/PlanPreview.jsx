import React, { useEffect, useRef, useState } from "react";

import { useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import layout from "../../css/layout.module.css";
import styles from "./planPreview.module.css";
import btnStyles from "../../css/buttons.module.css";

import Header from "../header/Header";

function PlanPreview() {
  const navigate = useNavigate();
  const nextLink = useRef();

  const draft = useSelector((state) => state.planDraft);
  const [exercises, setExercises] = useState();

  useEffect(() => {
    if (draft.routineType.length === 0) {
      navigate("/create-plan/routine");
    }

    if (draft.routineType === "full body") {
      setExercises(draft.fullbodyExercises);
    }
    if (draft.routineType === "a/b split") {
      setExercises(draft.upperSplitExercises.concat(draft.lowerSplitExercises));
    }
    if (draft.routineType === "ppl") {
      setExercises(draft.pushDayExercises.concat(draft.pullDayExercises, draft.legsDayExercises));
    }
  }, [draft.routineType]);

  useEffect(() => {});
  return (
    <>
      <section className={`${layout.content__wrapper__bg}`}>
        <div className={layout.twoRow__grid__layout}>
          <div className={styles.preview}>
            <Header
              routineType={"#" + draft.routineType}
              routineVolume={"#" + draft.volume + " reps"}
            />
            {exercises !== undefined && (
              <div className={styles.preview__items}>
                {exercises.map((exercise, index) => (
                  <div key={exercise.exercise + index} className={styles.preview__item}>
                    <div className={styles.spacerTop}></div>
                    <div>
                      {exercise.exercise} / {exercise.currentWeight}
                      {draft.massUnit}
                    </div>
                    <div className={styles.spacerBottom}></div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ marginBottom: "var(--padding)" }} className={`${btnStyles.btns__row} `}>
            {draft.routineType === "full body" && (
              <Link
                ref={nextLink}
                className={`${btnStyles.btn} ${btnStyles.secondaryBtn} `}
                to="/create-plan/fullbody-exercises"
              >
                <span>go back</span>
              </Link>
            )}
            {draft.routineType === "a/b split" && (
              <Link
                ref={nextLink}
                className={`${btnStyles.btn} ${btnStyles.secondaryBtn} `}
                to="/create-plan/lowerSplit-exercises"
              >
                <span>go back</span>
              </Link>
            )}
            {draft.routineType === "ppl" && (
              <Link
                ref={nextLink}
                className={`${btnStyles.btn} ${btnStyles.secondaryBtn} `}
                to="/create-plan/legs-exercises"
              >
                <span>go back</span>
              </Link>
            )}
            <Link
              to="/create-plan/name-plan"
              className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}
            >
              <span>looks solid!</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default PlanPreview;
