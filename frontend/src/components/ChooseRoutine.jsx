import React, { useState, useEffect, useRef } from "react";

import { Link } from "react-router-dom";

import layout from "../css/layout.module.css";
import styles from "../css/signIn.module.css";
import btnStyles from "../css/buttons.module.css";

function ChooseRoutine({ setRoutineType, setShowVolume }) {
  const [btnStatus, setBtnStatus] = useState(true);
  const activeBtn = useRef();

  const onClick = (e) => {
    setRoutineType(e.currentTarget.innerText.toLowerCase());
    activeBtn.current.classList.remove(btnStyles.primaryBtn);
    activeBtn.current = e.currentTarget;
    activeBtn.current.classList.add(btnStyles.primaryBtn);
    setBtnStatus(false);
  };

  const forwardBtn = useRef();

  return (
    <>
      <section className={layout.content__wrapper}>
        <div className={layout.flex__layout}>
          <header>
            <div className={styles.form__heading}>
              <span>type of routine?</span>
            </div>
          </header>
          <div className={`${btnStyles.btns__col}`}>
            <button
              ref={activeBtn}
              onClick={onClick}
              className={`${btnStyles.btn} ${btnStyles.secondaryBtn} `}
            >
              <span>fullbody</span>
            </button>
            <button onClick={onClick} className={`${btnStyles.btn} ${btnStyles.secondaryBtn} `}>
              <span>upper/lower split</span>
            </button>
            <button onClick={onClick} className={`${btnStyles.btn} ${btnStyles.secondaryBtn} `}>
              <span>push/pull/legs</span>
            </button>
          </div>
          <div className={`${btnStyles.btns__row} ${btnStyles.absolute}`}>
            <Link to="/home">
              <button
                className={`${btnStyles.btn} ${btnStyles.secondaryBtn} ${btnStyles.arrowBtn}`}
              >
                <span>←</span>
              </button>
            </Link>
            <button
              ref={forwardBtn}
              disabled={btnStatus}
              onClick={() => setShowVolume(true)}
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

export default ChooseRoutine;
