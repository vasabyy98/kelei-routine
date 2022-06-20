import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "../css/signIn.module.css";
import btnStyles from "../css/buttons.module.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const onChange = () => {};

  return (
    <>
      <section className={styles.content__wrapper}>
        <form className={styles.form}>
          <div className={styles.form__group}>
            <header className={styles.form__heading}>
              <span className={styles.heading}>name</span>
            </header>

            <input
              type="text"
              className={styles.form__control}
              id="name"
              name="name"
              value={name}
              placeholder="type your name here..."
              onChange={onChange}
            />
          </div>
          <div className={styles.form__group}>
            <header className={styles.form__heading}>
              <span className={styles.heading}>email adress</span>
            </header>

            <input
              type="email"
              className={styles.form__control}
              id="email"
              name="email"
              placeholder="type your email here..."
            />
          </div>
          <div className={styles.form__group}>
            <header className={styles.form__heading}>
              <span className={styles.heading}>password</span>
            </header>

            <input
              type="password"
              className={styles.form__control}
              id="password"
              name="password"
              placeholder="type your password here..."
            />
          </div>
          <div className={`${btnStyles.form__btns}`}>
            <Link to="/login">
              <button
                type="submit"
                className={`${btnStyles.btn} ${btnStyles.secondaryBtn} ${btnStyles.arrowBtn}`}
              >
                <span>←</span>
              </button>
            </Link>

            <button type="submit" className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}>
              <span>Create account</span>
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
