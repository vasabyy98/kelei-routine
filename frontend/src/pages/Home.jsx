import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout, reset } from "../features/auth/authSlice";
import { getExercises, resetExercises } from "../features/exercises/exerciseSlice";

import layout from "../css/layout.module.css";
import styles from "../css/home.module.css";
import btnStyles from "../css/buttons.module.css";
import header from "../css/header.module.css";
import image from "../css/backgroundImage.module.css";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { exercises, isError, message } = useSelector((state) => state.exercises);

  const plansContainer = useRef(null);
  const exercisesContainer = useRef(null);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  useEffect(() => {
    // if (plans.length === 0) {
    //   plansContainer.current.classList.add(styles.home__inner__disabled);
    // } else {
    //   plansContainer.current.classList.remove(styles.home__inner__disabled);
    // }

    if (!user) {
      navigate("/");
    }

    if (isError) console.log(message);

    dispatch(getExercises());

    return () => {
      dispatch(resetExercises());
    };
  }, [user, navigate, isError, message, dispatch]);

  const [greeting, setGreeting] = useState("Welcome back,");

  let currentTime = new Date();
  let morningStart = new Date();
  let morningEnd = new Date();
  let afternoonStart = new Date();
  let afternoonEnd = new Date();
  let eveningStart = new Date();
  let eveningEnd = new Date();
  let nightStart = new Date();
  let nightEnd = new Date();

  morningStart.setHours(4, 0, 0);
  morningEnd.setHours(12, 0, 0);
  afternoonStart.setHours(12, 0, 0);
  afternoonEnd.setHours(17, 0, 0);
  eveningStart.setHours(17, 0, 0);
  eveningEnd.setHours(21, 0, 0);
  nightStart.setHours(21, 0, 0);
  nightEnd.setHours(4, 0, 0);

  useEffect(() => {
    if (currentTime >= morningStart && currentTime <= morningEnd) {
      setGreeting("Good morning,");
    } else if (currentTime >= afternoonStart && currentTime <= afternoonEnd) {
      setGreeting("Good afternoon,");
    } else if (currentTime >= eveningStart && currentTime <= eveningEnd) {
      setGreeting("Good evening,");
    } else if (currentTime >= nightStart && currentTime <= nightEnd) {
      setGreeting("Welcome back,");
    }
  }, []);

  const onClick = (e) => {
    if (e.currentTarget === exercisesContainer.current) navigate("/exercises");
  };

  return (
    <>
      <div className={image.backgroundImageHome}></div>
      <section className={layout.content__wrapper}>
        <div className={layout.threeRow__grid__layout}>
          <header className={styles.home__header}>
            <h2 className={header.heading__h2}>
              <span>{greeting}</span>
              <span style={{ textTransform: "capitalize" }}>{user.name}!</span>
            </h2>
            <p style={{ maxWidth: "unset" }} className={header.subheading}>
              Are you ready to make new PRs?
            </p>
          </header>
          <div className={styles.home__main}>
            <div ref={plansContainer} className={`${styles.home__plan} ${styles.home__inner}`}>
              <h2 className={header.heading__h2}>My plans↘</h2>
              <h2 className={header.heading__h2}>0</h2>
            </div>
            <div
              ref={exercisesContainer}
              onClick={onClick}
              className={`${styles.home__exercises} ${styles.home__inner}`}
            >
              <h2 className={header.heading__h2}>My exercises↘</h2>
              <h2 className={header.heading__h2}>{exercises.length}</h2>
            </div>
          </div>
          <div className={btnStyles.btns__row}>
            <button onClick={onLogout} className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}>
              <span>log out</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
