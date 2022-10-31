import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout, reset } from "../features/auth/authSlice";
import { getExercises } from "../features/exercises/exerciseSlice";
import { getPlans } from "../features/plans/planSlice";

import { gsap } from "gsap";

import layout from "../css/layout.module.css";
import styles from "../css/home.module.css";
import btnStyles from "../css/buttons.module.css";
import header from "../css/header.module.css";
import image from "../css/backgroundImage.module.css";

function Home() {
  const backgroundImage = useRef();
  const staggerAnimationContainer = useRef();
  const buttons = useRef();
  const tl = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      tl.current = gsap
        .timeline()
        .fromTo(
          backgroundImage.current,
          {
            opacity: 0,
            backgroundSize: "200%",
          },
          {
            opacity: 1,
            backgroundSize: "150%",
            ease: "expo.out",
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
          buttons.current,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 1,
          },
          "+0.75"
        );
    }, staggerAnimationContainer);

    return () => ctx.revert();
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { exercises, isError, message } = useSelector((state) => state.exercises);
  const { plans } = useSelector((state) => state.plans);

  const plansLink = useRef(null);
  const exercisesLink = useRef(null);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    if (isError) console.log(message);

    dispatch(getExercises());
    dispatch(getPlans());
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
  }, [currentTime]);

  const onClick = (e) => {
    if (e.currentTarget === exercisesLink.current) navigate("/exercises");
    if (e.currentTarget === plansLink.current) navigate("/plans");
  };

  return (
    <>
      <div ref={backgroundImage} className={image.backgroundImageHome}></div>
      <section className={layout.content__wrapper}>
        <div ref={staggerAnimationContainer} className={layout.threeRow__grid__layout}>
          <header className={styles.home__header}>
            <h2 className={`${header.heading__h2} ${"animate__item"}`}>
              <span>{greeting}</span>
              <span style={{ textTransform: "capitalize" }}>{user.name}!</span>
            </h2>
            <p style={{ maxWidth: "unset" }} className={`${header.subheading} ${"animate__item"}`}>
              Are you ready to make new PRs?
            </p>
          </header>
          <div className={styles.home__main}>
            <div
              ref={exercisesLink}
              onClick={onClick}
              className={`${styles.home__exercises} ${styles.home__inner} ${"animate__item"}`}
            >
              <h2 className={header.heading__h2}>My exercises↘</h2>
              <h2 className={header.heading__h2}>{exercises.length}</h2>
            </div>
            <div
              onClick={onClick}
              ref={plansLink}
              className={`${styles.home__plan} ${styles.home__inner} ${"animate__item"}`}
            >
              <h2 className={header.heading__h2}>My plans↘</h2>
              <h2 className={header.heading__h2}>{plans.length}</h2>
            </div>
          </div>
          <div ref={buttons} className={btnStyles.btns__row}>
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
