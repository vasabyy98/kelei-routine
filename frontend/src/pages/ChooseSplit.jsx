import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { setSplit } from "../features/plans/chosenSplit";
import { getExercises } from "../features/exercises/exerciseSlice";

import layout from "../css/layout.module.css";
import header from "../css/header.module.css";
import nav from "../css/nav.module.css";
import styles from "../css/signIn.module.css";

function ChooseSplit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const splits = useSelector((state) => state.chosenPlan.exercises[0]);

  useEffect(() => {
    if (splits === undefined) {
      navigate("/plans");
    } else {
      Object.keys(splits).map((split) => split === "Fullbody" && navigate("/plans"));
    }
  });

  const onClick = (e) => {
    const split = e.currentTarget.value;

    dispatch(setSplit(split));
    dispatch(getExercises());
    navigate("/choose-exercise");
  };
  return (
    <>
      {splits !== undefined && (
        <section className={layout.content__wrapper}>
          <div className={`${styles.form} ${layout.twoRow__grid__layout}`}>
            <nav className={nav.nav}>
              <Link to="/plans">
                <span className={nav.arrow__link}>←</span>
              </Link>
            </nav>
            <div className={styles.form__inner}>
              <header className={header.header}>
                <h2 className={header.heading__h2}>Choose split</h2>
              </header>
              <div className={styles.input__wrapper}>
                {Object.keys(splits).map((key, i) => (
                  <div key={key + i} className={styles.form__group}>
                    <div className={`${styles.form__control}`}>
                      <span>{key}</span>
                    </div>
                    <input
                      onClick={onClick}
                      type="radio"
                      value={key}
                      name="split"
                      className={styles.form__control__radio}
                    />
                    <div className={styles.gradient__stroke}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default ChooseSplit;
