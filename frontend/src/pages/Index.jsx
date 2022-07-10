import React from "react";
import { Link } from "react-router-dom";

import layout from "../css/layout.module.css";
import styles from "../css/index.module.css";
import btnStyles from "../css/buttons.module.css";

function Home() {
  return (
    <>
      <section className={layout.content__wrapper}>
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
              Bodybuilding framework and general guidelines for lifters of any expertise to promote
              hypertrophy.
            </p>
          </div>
          <div className={`${btnStyles.btns__row} ${btnStyles.absolute}`}>
            <Link to="/about">
              <button className={`${btnStyles.btn} ${btnStyles.secondaryBtn}`}>
                <span>learn more</span>
              </button>
            </Link>
            <Link to="/login">
              <button className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}>
                <span>get started</span>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
