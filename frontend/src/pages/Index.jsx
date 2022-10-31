import React, { useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";

import { gsap } from "gsap";

import layout from "../css/layout.module.css";
import styles from "../css/index.module.css";
import btnStyles from "../css/buttons.module.css";
import image from "../css/backgroundImage.module.css";
import nav from "../css/nav.module.css";

function Home() {
  const backgroundImage = useRef(null);
  const staggerAnimationContainer = useRef(null);
  const subheading = useRef(null);
  const buttons = useRef(null);
  const navContainer = useRef(null);
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
          backgroundImage.current,
          {
            opacity: 0,
            backgroundSize: "200%",
          },
          {
            opacity: 1,
            backgroundSize: "150%",
            ease: "expo.out",
            duration: 2,
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
            stagger: 0.1,
            duration: 1,
          },
          "+0.25"
        )
        .fromTo(
          buttons.current,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 1,
          },
          "+0.75"
        );
    }, staggerAnimationContainer);

    return () => ctx.revert();
  }, []);
  return (
    <>
      <div ref={backgroundImage} className={image.backgroundImageIndex}></div>
      <section className={layout.content__wrapper}>
        <div ref={staggerAnimationContainer} className={layout.threeRow__grid__layout}>
          <nav ref={navContainer} className={nav.nav}>
            <Link to="/">
              <span className={nav.arrow__link}></span>
            </Link>
            <Link to="/about">
              <span className={nav.text__link}>Learn more</span>
            </Link>
          </nav>
          <div className={styles.intro}>
            <header className={styles.intro__header}>
              <div className={`${styles.intro__header__line} ${"animate__item"}`}>
                <span className={styles.intro__header__heading}>kelei</span>
              </div>
              <div className={`${styles.intro__header__line} ${"animate__item"}`}>
                <span className={styles.intro__header__heading}>routine</span>
              </div>
            </header>
            <p ref={subheading} className={`${styles.intro__subheading} ${"animate__item"}`}>
              Bodybuilding framework for lifters of any expertise to promote hypertrophy.
            </p>
          </div>
          <div ref={buttons} className={`${btnStyles.btns__row}`}>
            <Link className={`${btnStyles.btn} ${btnStyles.primaryBtn}`} to="/login">
              <span>get started</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
