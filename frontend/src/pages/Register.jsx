import React from "react";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import { register, reset } from "../features/auth/authSlice";

import layout from "../css/layout.module.css";
import styles from "../css/signIn.module.css";
import btnStyles from "../css/buttons.module.css";

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
        <div className={layout.flex__layout}>
          <form onSubmit={onSubmit} className={styles.form}>
            <div className={styles.form__group}>
              <header>
                <div className={styles.form__heading}>
                  <span>name</span>
                </div>
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
                placeholder="type your email here..."
                onChange={onChange}
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
                name="password"
                value={password}
                placeholder="type your password here..."
                onChange={onChange}
              />
            </div>
            <div className={`${btnStyles.btns__row}`}>
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
        </div>
      </section>
    </>
  );
}

export default Register;
