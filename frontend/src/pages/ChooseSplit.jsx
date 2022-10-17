import React, { useEffect, useRef, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { setSplit } from "../features/plans/chosenSplit";
import { getExercises } from "../features/exercises/exerciseSlice";

import { gsap } from "gsap";

import layout from "../css/layout.module.css";
import header from "../css/header.module.css";
import nav from "../css/nav.module.css";
import styles from "../css/signIn.module.css";

function ChooseSplit() {
  const staggerAnimationContainer = useRef();
  const navContainer = useRef();
  const tl = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap
        .timeline()
        .fromTo(
          navContainer.current,
          {
            opacity: 0,
            yPercent: -100,
          },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
          },
          "+0.1"
        )
        .fromTo(
          ".animate__item",
          {
            opacity: 0,
            y: 25,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 1,
          },
          "+0.25"
        )
        .fromTo(
          ".animate__item--input",
          {
            opacity: 0,
            scale: 0.85,
          },
          {
            opacity: 1,
            scale: 1,
            stagger: 0.2,
            duration: 1,
          },
          "+0.5"
        );
    }, staggerAnimationContainer);

    return () => ctx.revert();
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const splits = useSelector((state) => state.chosenPlan.exercises[0]);

  useEffect(() => {
    if (splits === undefined) {
      navigate("/plans");
    } else {
      Object.keys(splits).map((split) => {
        if (split === "Fullbody") {
          dispatch(setSplit(split));
          dispatch(getExercises());
          navigate("/choose-exercise");
        }
      });
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
            <nav ref={navContainer} className={nav.nav}>
              <Link to="/plans">
                <span className={nav.arrow__link}>←</span>
              </Link>
            </nav>
            <div ref={staggerAnimationContainer} className={styles.form__inner}>
              <header className={header.header}>
                <h2 className={`${header.heading__h2} ${"animate__item"}`}>Choose split</h2>
              </header>
              <div className={styles.input__wrapper}>
                {Object.keys(splits).map((key, i) => (
                  <div key={key + i} className={`${styles.form__group} ${"animate__item--input"}`}>
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
