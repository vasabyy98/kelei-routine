import React from "react";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { login, reset } from "../features/auth/authSlice";

import { gsap } from "gsap";

import layout from "../css/layout.module.css";
import styles from "../css/signIn.module.css";
import header from "../css/header.module.css";
import btnStyles from "../css/buttons.module.css";
import nav from "../css/nav.module.css";

function Login() {
  const staggerAnimationContainer = useRef();
  const buttons = useRef();
  const navContainer = useRef();
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
            stagger: 0.1,
            duration: 1,
          },
          "+0.25"
        )
        .fromTo(
          ".animate__item--input",
          {
            opacity: 0,
            scale: 0.85,
          },
          {
            opacity: 1,
            scale: 1,
            stagger: 0.1,
            duration: 1,
          },
          "+0.5"
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
          "+1"
        );
    }, staggerAnimationContainer);

    return () => ctx.revert();
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message } = useSelector((state) => state.auth);

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
      <section className={layout.content__wrapper}>
        <form onSubmit={onSubmit} className={`${styles.form} ${layout.threeRow__grid__layout}`}>
          <nav ref={navContainer} className={nav.nav}>
            <Link to="/">
              <span className={nav.arrow__link}>←</span>
            </Link>
            <Link to="/register">
              <span className={nav.text__link}>Sign up</span>
            </Link>
          </nav>
          <div ref={staggerAnimationContainer} className={styles.form__inner}>
            <header className={header.header}>
              <h2 className={`${header.heading__h2} ${"animate__item"}`}>Let's sign you in!</h2>
              <p className={`${header.subheading} ${"animate__item"}`}>
                Log in or sign up to get started.
              </p>
            </header>
            <div className={styles.input__wrapper}>
              <div className={`${styles.form__group} ${"animate__item--input"}`}>
                <input
                  type="email"
                  className={styles.form__control}
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  placeholder="Email adress"
                />
                <div className={styles.gradient__stroke}></div>
              </div>
              <div className={`${styles.form__group} ${"animate__item--input"}`}>
                <input
                  type="password"
                  className={styles.form__control}
                  id="password"
                  value={password}
                  onChange={onChange}
                  name="password"
                  placeholder="Password"
                />
                <div className={styles.gradient__stroke}></div>
              </div>
            </div>
          </div>
          <div ref={buttons} className={btnStyles.btns__row}>
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
