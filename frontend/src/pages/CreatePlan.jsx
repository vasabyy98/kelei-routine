import React from "react";

import styles from "../css/signIn.module.css";
import btnStyles from "../css/buttons.module.css";

function CreatePlan() {
  return (
    <>
      <section className={styles.content__wrapper}>
        <form className={styles.form}>
          <header className={styles.form__heading}>
            <span>add your upper split exercises</span>
          </header>
          <div className={styles.form__group}>
            <input
              type="text"
              className={styles.form__control}
              id="name"
              name="name"
              placeholder="type exercise name here..."
            />
          </div>
          <div className={styles.form__group}>
            <input
              type="text"
              className={styles.form__control}
              id="name"
              name="name"
              placeholder="type exercise name here..."
            />
          </div>
          <div className={`${btnStyles.form__btns}`}>
            <button type="submit" className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}>
              <span>Create account</span>
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default CreatePlan;
