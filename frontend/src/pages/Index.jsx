import React from "react";
import { Link } from "react-router-dom";

import layout from "../css/layout.module.css";
import styles from "../css/index.module.css";
import btnStyles from "../css/buttons.module.css";
import image from "../css/backgroundImage.module.css";
import nav from "../css/nav.module.css";

function Home() {
  return (
    <>
      <div className={image.backgroundImageIndex}></div>
      <section className={layout.content__wrapper}>
        <div className={layout.threeRow__grid__layout}>
          <nav className={nav.nav}>
            <Link to="/">
              <span className={nav.arrow__link}></span>
            </Link>
            <Link to="/about">
              <span className={nav.text__link}>Learn more</span>
            </Link>
          </nav>
          <div className={layout.flex__layout}>
            <div className={styles.intro}>
              <header className={styles.intro__header}>
                <div className={styles.intro__header__line}>
                  <span className={styles.intro__header__heading}>kelei</span>
                </div>
                <div className={styles.intro__header__line}>
                  <span className={styles.intro__header__heading}>routine</span>
                </div>
              </header>
              <p className={styles.intro__subheading}>
                Bodybuilding framework for lifters of any expertise to promote hypertrophy.
              </p>
            </div>
          </div>
          <div className={`${btnStyles.btns__row}`}>
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
