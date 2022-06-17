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
        <div className={styles.form}>
          <div className={styles.form__group}>
            <header className={styles.form__heading}>
              <span className={styles.heading}>name</span>
            </header>
            <form>
              <input
                type="text"
                className={styles.form__control}
                id="name"
                name="name"
                value={name}
                placeholder="type your name here..."
                onChange={onChange}
              />
            </form>
          </div>
          <div className={styles.form}>
            <div className={styles.form__group}>
              <header className={styles.form__heading}>
                <span className={styles.heading}>email adress</span>
              </header>
              <form>
                <input
                  type="email"
                  className={styles.form__control}
                  id="email"
                  name="email"
                  placeholder="type your email here..."
                />
              </form>
            </div>
            <div className={styles.form__group}>
              <header className={styles.form__heading}>
                <span className={styles.heading}>password</span>
              </header>
              <form>
                <input
                  type="password"
                  className={styles.form__control}
                  id="password"
                  name="password"
                  placeholder="type your password here..."
                />
              </form>
            </div>
          </div>
        </div>
        <div className={`${btnStyles.form__btns} ${btnStyles.absolute}`}>
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
      </section>
    </>
  );
}

export default Register;
