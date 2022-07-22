import React, { useState, useEffect, useRef } from "react";

import layout from "../../css/layout.module.css";
import btnStyles from "../../css/buttons.module.css";

import Header from "../header/Header";

function RoutineVolume({
  setRoutineVolume,
  volumeSection,
  showVolume,
  setShowVolume,
  setShowAddExercises,
}) {
  const activeBtn = useRef();
  const [btnStatus, setBtnStatus] = useState(true);

  const onClick = (e) => {
    setRoutineVolume(e.currentTarget.innerText);
    activeBtn.current.classList.remove(btnStyles.btn__selected);
    activeBtn.current = e.currentTarget;
    activeBtn.current.classList.add(btnStyles.btn__selected);
    setBtnStatus(false);
  };

  useEffect(() => {
    if (showVolume) {
      volumeSection.current.classList.add(layout.visible);
    } else {
      volumeSection.current.classList.remove(layout.visible);
    }
  }, [showVolume]);
  return (
    <>
      <section ref={volumeSection} className={`${layout.content__wrapper__bg} ${layout.hidden}`}>
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
            <button
              onClick={() => setShowVolume(false)}
              className={`${btnStyles.btn} ${btnStyles.secondaryBtn} `}
            >
              <span>go back</span>
            </button>
            <button
              disabled={btnStatus}
              onClick={() => setShowAddExercises(true)}
              className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}
            >
              <span>next step</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default RoutineVolume;
