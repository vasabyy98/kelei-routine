import React from "react";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import { register, reset } from "../features/auth/authSlice";

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
        <form onSubmit={onSubmit} className={styles.form}>
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
              value={email}
              placeholder="type your email here..."
              onChange={onChange}
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
              value={password}
              placeholder="type your password here..."
              onChange={onChange}
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
