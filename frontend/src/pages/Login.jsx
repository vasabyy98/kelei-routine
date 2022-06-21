import React from "react";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "../css/signIn.module.css";
import btnStyles from "../css/buttons.module.css";

import { login, reset } from "../features/auth/authSlice";

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
      navigate("/");
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
      <section className={styles.content__wrapper}>
        <form onSubmit={onSubmit} className={styles.form}>
          <div className={styles.form__group}>
            <header className={styles.form__heading}>
              <span className={styles.heading}>email adress</span>
            </header>
            <input
              type="email"
              className={styles.form__control}
              id="email"
              name="email"
              value={email}
              onChange={onChange}
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
              value={password}
              onChange={onChange}
              name="password"
              placeholder="type your password here..."
            />
          </div>
          <div className={btnStyles.form__btns}>
            <Link to="/">
              <button
                type="submit"
                className={`${btnStyles.btn} ${btnStyles.secondaryBtn} ${btnStyles.arrowBtn}`}
              >
                <span>←</span>
              </button>
            </Link>
            <button type="submit" className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}>
              <span>Log in</span>
            </button>
          </div>
          <div className={`${btnStyles.form__btns} ${btnStyles.loginForm} ${btnStyles.absolute}`}>
            <span>Don't have an account?</span>
            <Link to="/register">
              <button type="submit" className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}>
                <span>Create account</span>
              </button>
            </Link>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
