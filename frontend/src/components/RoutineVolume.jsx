import React, { useState, useEffect, useRef } from "react";

import layout from "../css/layout.module.css";
import styles from "../css/signIn.module.css";
import btnStyles from "../css/buttons.module.css";

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
    activeBtn.current.classList.remove(btnStyles.primaryBtn);
    activeBtn.current = e.currentTarget;
    activeBtn.current.classList.add(btnStyles.primaryBtn);
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
      <section ref={volumeSection} className={`${layout.content__wrapper} ${layout.hidden}`}>
        <div className={layout.flex__layout}>
          <header>
            <div className={styles.form__heading}>
              <span>volume per</span>
            </div>
            <div className={styles.form__heading}>
              <span>exercise?</span>
            </div>
          </header>
          <div className={`${btnStyles.btns__col}`}>
            <button
              ref={activeBtn}
              onClick={onClick}
              className={`${btnStyles.btn} ${btnStyles.secondaryBtn} `}
            >
              <span>30</span>
            </button>
            <button onClick={onClick} className={`${btnStyles.btn} ${btnStyles.secondaryBtn} `}>
              <span>40</span>
            </button>
            <button onClick={onClick} className={`${btnStyles.btn} ${btnStyles.secondaryBtn} `}>
              <span>50</span>
            </button>
          </div>
          <div className={`${btnStyles.btns__row} ${btnStyles.absolute}`}>
            <button
              onClick={() => setShowVolume(false)}
              className={`${btnStyles.btn} ${btnStyles.secondaryBtn} ${btnStyles.arrowBtn}`}
            >
              <span>←</span>
            </button>
            <button
              disabled={btnStatus}
              onClick={() => setShowAddExercises(true)}
              className={`${btnStyles.btn} ${btnStyles.primaryBtn} ${btnStyles.arrowBtn}`}
            >
              <span>→</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default RoutineVolume;
