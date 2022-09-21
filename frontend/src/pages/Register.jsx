import React from "react";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { register, reset } from "../features/auth/authSlice";

import layout from "../css/layout.module.css";
import styles from "../css/signIn.module.css";
import btnStyles from "../css/buttons.module.css";
import header from "../css/header.module.css";
import nav from "../css/nav.module.css";

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
      <section className={styles.content__wrapper}>
        <form onSubmit={onSubmit} className={`${styles.form} ${layout.threeRow__grid__layout}`}>
          <nav className={nav.nav}>
            <Link to="/login">
              <span className={nav.arrow__link}>←</span>
            </Link>
            <Link to="/">
              <span className={nav.text__link}>Home</span>
            </Link>
          </nav>
          <div className={styles.form__inner}>
            <header className={header.header}>
              <h2 className={header.heading__h2}>Got no time to waste!</h2>
              <p className={header.subheading}>Create account by filling up the form below.</p>
            </header>
            <div className={styles.input__wrapper}>
              <div className={styles.form__group}>
                <input
                  type="text"
                  className={styles.form__control}
                  id="name"
                  name="name"
                  value={name}
                  onChange={onChange}
                  placeholder="Name"
                />
                <div className={styles.gradient__stroke}></div>
              </div>
              <div className={styles.form__group}>
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
              <div className={styles.form__group}>
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
          <div className={btnStyles.btns__row}>
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
