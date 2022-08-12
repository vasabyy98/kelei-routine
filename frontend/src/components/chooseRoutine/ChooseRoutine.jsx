import React, { useState, useRef, useEffect } from "react";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setRoutine, resetAllExercises } from "../../features/plans/planDraftSlice";

import layout from "../../css/layout.module.css";
import styles from "../../css/signIn.module.css";
import btnStyles from "../../css/buttons.module.css";

import Header from "../header/Header";

function ChooseRoutine() {
  const dispatch = useDispatch();

  const [btnStatus, setBtnStatus] = useState(true);
  const activeBtn = useRef();

  const nextLink = useRef();

  const [routineType, setRoutineType] = useState(null);

  const onClick = (e) => {
    setRoutineType(e.currentTarget.innerText.toLowerCase());
    activeBtn.current.classList.remove(btnStyles.btn__selected);
    activeBtn.current = e.currentTarget;
    activeBtn.current.classList.add(btnStyles.btn__selected);
    setBtnStatus(false);
    nextLink.current.classList.remove(btnStyles.disabledBtn);

    dispatch(resetAllExercises());
  };

  useEffect(() => {
    routineType !== null && dispatch(setRoutine(routineType));
  }, [routineType]);

  return (
    <>
      <section className={layout.content__wrapper__bg}>
        <div className={layout.twoRow__grid__layout}>
          <div className={layout.flex__layout}>
            <Header line1={"type of"} line2={"routine"} />
            <div className={`${btnStyles.btns__col__select}`}>
              <div ref={activeBtn} onClick={onClick} className={`${btnStyles.btn__select} `}>
                <span>full body</span>
              </div>
              <div onClick={onClick} className={`${btnStyles.btn__select}`}>
                <span>a/b split</span>
              </div>
              <div onClick={onClick} className={`${btnStyles.btn__select}`}>
                <span>ppl</span>
              </div>
            </div>
            <div className={styles.clarification}>
              <p>#A/B SPLIT - alternate between upper and lower muscle groups.</p>
              <p>#PPL - push/pull/legs, each part is trained on seperate days.</p>
            </div>
          </div>
          <div className={`${btnStyles.btns__row} `}>
            <Link className={`${btnStyles.btn} ${btnStyles.secondaryBtn}`} to="/home">
              <span>go back</span>
            </Link>
            <Link
              ref={nextLink}
              className={`${btnStyles.btn} ${btnStyles.primaryBtn} ${btnStyles.disabledBtn}`}
              to="/create-plan/volume"
            >
              <span>next step</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default ChooseRoutine;
