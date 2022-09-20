import React, { useState, useEffect, useRef } from "react";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setVolume } from "../../features/plans/planDraftSlice";

import layout from "../../css/layout.module.css";
import btnStyles from "../../css/buttons.module.css";

import Header from "../header/Header";

function RoutineVolume() {
  const dispatch = useDispatch();

  const activeBtn = useRef();

  const nextLink = useRef();

  const [routineVolume, setRoutineVolume] = useState(null);

  const onClick = (e) => {
    setRoutineVolume(e.currentTarget.innerText);
    activeBtn.current.classList.remove(btnStyles.btn__selected);
    activeBtn.current = e.currentTarget;
    activeBtn.current.classList.add(btnStyles.btn__selected);
    nextLink.current.classList.remove(btnStyles.disabledBtn);
  };

  const draftRoutine = useSelector((state) => state.planDraft.routineType);

  useEffect(() => {
    routineVolume !== null && dispatch(setVolume(routineVolume));
  }, [routineVolume]);
  return (
    <>
      <section className={`${layout.content__wrapper__bg} `}>
        <div className={layout.twoRow__grid__layout}>
          <div className={layout.flex__layout}>
            <Header line1={"volume"} line2={"per"} line3={"exercise"} />
            <div className={`${btnStyles.btns__col__select}`}>
              <div ref={activeBtn} onClick={onClick} className={`${btnStyles.btn__select}`}>
                <span>30</span>
              </div>
              <div onClick={onClick} className={`${btnStyles.btn__select}`}>
                <span>40</span>
              </div>
              <div onClick={onClick} className={`${btnStyles.btn__select} `}>
                <span>50</span>
              </div>
            </div>
          </div>
          <div className={`${btnStyles.btns__row}`}>
            <Link
              className={`${btnStyles.btn} ${btnStyles.secondaryBtn}`}
              to="/create-plan/routine"
            >
              <span>go back</span>
            </Link>
            {draftRoutine === "full body" && (
              <Link
                ref={nextLink}
                className={`${btnStyles.btn} ${btnStyles.primaryBtn} ${btnStyles.disabledBtn}`}
                to="/create-plan/fullbody-exercises"
              >
                <span>next step</span>
              </Link>
            )}
            {draftRoutine === "a/b split" && (
              <Link
                ref={nextLink}
                className={`${btnStyles.btn} ${btnStyles.primaryBtn} ${btnStyles.disabledBtn}`}
                to="/create-plan/upperSplit-exercises"
              >
                <span>next step</span>
              </Link>
            )}
            {draftRoutine === "ppl" && (
              <Link
                ref={nextLink}
                className={`${btnStyles.btn} ${btnStyles.primaryBtn} ${btnStyles.disabledBtn}`}
                to="/create-plan/push-exercises"
              >
                <span>next step</span>
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default RoutineVolume;
