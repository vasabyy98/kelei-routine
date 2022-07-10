import React from "react";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { login, reset } from "../features/auth/authSlice";

import layout from "../css/layout.module.css";
import styles from "../css/signIn.module.css";
import btnStyles from "../css/buttons.module.css";

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
      <section className={styles.content__wrapper}>
        <div className={layout.flex__layout}>
          <form onSubmit={onSubmit} className={styles.form}>
            <div className={styles.form__group}>
              <header>
                <div className={styles.form__heading}>
                  <span>email adress</span>
                </div>
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
              <header>
                <div className={styles.form__heading}>
                  <span>password</span>
                </div>
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
            <div className={btnStyles.btns__row}>
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
            <div className={`${btnStyles.btns__col} ${btnStyles.loginForm} ${btnStyles.absolute}`}>
              <span>Don't have an account?</span>
              <Link to="/register">
                <button type="submit" className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}>
                  <span>Create account</span>
                </button>
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
