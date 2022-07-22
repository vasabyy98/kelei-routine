import React from "react";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { login, reset } from "../features/auth/authSlice";

import layout from "../css/layout.module.css";
import styles from "../css/signIn.module.css";
import btnStyles from "../css/buttons.module.css";
import image from "../css/backgroundImage.module.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      // toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/home");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  return (
    <>
      <div className={image.backgroundImageSignIn}></div>
      <section className={styles.content__wrapper}>
        <form onSubmit={onSubmit} className={`${styles.form} ${layout.twoRow__grid__layout}`}>
          <div className={styles.form__inner}>
            <header className={styles.header}>
              <div className={styles.header__row}>
                <span className={styles.header__text}>
                  l<span className={styles.alternative}>e</span>t's
                </span>
              </div>
              <div className={styles.header__row}>
                <span className={styles.header__text}>sign</span>
              </div>
              <div className={styles.header__row}>
                <span className={styles.header__text}>you in</span>
              </div>
            </header>
            <div className={styles.form__group}>
              <input
                type="email"
                className={styles.form__control}
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="email"
              />
              <div className={styles.spacer}></div>
            </div>
            <div className={styles.form__group}>
              <input
                type="password"
                className={styles.form__control}
                id="password"
                value={password}
                onChange={onChange}
                name="password"
                placeholder="password"
              />
              <div className={styles.spacer}></div>
            </div>
          </div>
          <div className={btnStyles.btns__row}>
            <Link className={`${btnStyles.btn} ${btnStyles.secondaryBtn}`} to="/register">
              <span>Create account</span>
            </Link>
            <button type="submit" className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}>
              <span>sign in</span>
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
