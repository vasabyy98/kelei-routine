import React, { useRef, useLayoutEffect } from "react";

import { Link } from "react-router-dom";

import { gsap } from "gsap";

import layout from "../css/layout.module.css";
import styles from "../css/about.module.css";
import header from "../css/header.module.css";
import nav from "../css/nav.module.css";

function RepCounterHowTo() {
  const staggerAnimationContainer = useRef();
  const navContainer = useRef();
  const aboutContainer = useRef();
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
            duration: 1,
          },
          "+0.25"
        )
        .fromTo(
          "li",
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
        );
    }, staggerAnimationContainer);

    return () => ctx.revert();
  }, []);
  return (
    <>
      <section className={layout.content__wrapper}>
        <div className={` ${layout.threeRow__grid__layout}`}>
          <nav ref={navContainer} className={nav.nav}>
            <Link to="/rep-counter">
              <span className={nav.arrow__link}>←</span>
            </Link>
          </nav>
          <div ref={staggerAnimationContainer} className={layout.flex__layout}>
            <header className={header.header}>
              <h2 className={`${header.heading__h2} ${"animate__item"}`}>How to use rep counter</h2>
            </header>
            <div ref={aboutContainer} className={styles.about__content}>
              <div className={styles.about__inner}>
                <ol className={styles.about__list}>
                  <li>
                    Start by executing the first set of the exercise(8-12 repetitions first set, 3-5
                    repetitions rest pause set).
                  </li>
                  <li>
                    Once first set is completed, set the amount of repetitions you just have done
                    using “add rep” or “substract rep” buttons.{" "}
                  </li>
                  <li>
                    When you have rested long enough to do 3-5 more repetitions, press “next set”
                    button and repeat 1-4 points until repetition target is reached.
                  </li>
                  <li>
                    In case you can’t reach your repetition target press “finish” button and move on
                    to the next exercise if any.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default RepCounterHowTo;
