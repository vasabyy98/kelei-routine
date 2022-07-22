import React from "react";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { register, reset } from "../features/auth/authSlice";

import layout from "../css/layout.module.css";
import styles from "../css/signIn.module.css";
import btnStyles from "../css/buttons.module.css";
import image from "../css/backgroundImage.module.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

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
      name,
      email,
      password,
    };

    dispatch(register(userData));
  };

  return (
    <>
      <div className={image.backgroundImageSignIn}></div>
      <section className={styles.content__wrapper}>
        <form onSubmit={onSubmit} className={`${styles.form} ${layout.twoRow__grid__layout}`}>
          <div className={styles.form__inner}>
            <header className={styles.header}>
              <div className={styles.header__row}>
                <span className={styles.header__text}>got no</span>
              </div>
              <div className={styles.header__row}>
                <span className={styles.header__text}>
                  ti<span className={styles.alternative}>m</span>e to
                </span>
              </div>
              <div className={styles.header__row}>
                <span className={styles.header__text}>waste</span>
              </div>
            </header>
            <div className={styles.form__group}>
              <input
                type="text"
                className={styles.form__control}
                id="name"
                name="name"
                value={name}
                onChange={onChange}
                placeholder="name"
              />
              <div className={styles.spacer}></div>
            </div>
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
            <Link className={`${btnStyles.btn} ${btnStyles.secondaryBtn}`} to="/login">
              <span>go back</span>
            </Link>
            <button type="submit" className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}>
              <span>create account</span>
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
