import { Link } from "react-router-dom";
import styles from "../css/home.module.css";
import btnStyles from "../css/buttons.module.css";

function Home() {
  return (
    <>
      <section className={styles.content__wrapper}>
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
        <div className={`${btnStyles.form__btns} ${btnStyles.absolute}`}>
          <Link to="/about">
            <button type="submit" className={`${btnStyles.btn} ${btnStyles.secondaryBtn}`}>
              <span>learn more</span>
            </button>
          </Link>
          <Link to="/login">
            <button type="submit" className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}>
              <span>get started</span>
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;
