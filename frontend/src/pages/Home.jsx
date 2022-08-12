import React from "react";
import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { getPlans, resetPlans } from "../features/plans/planSlice";
import { resetDraft } from "../features/plans/planDraftSlice";

import layout from "../css/layout.module.css";
import styles from "../css/home.module.css";
import btnStyles from "../css/buttons.module.css";
import image from "../css/backgroundImage.module.css";

import ChooseWorkout from "../components/chooseWorkout/ChooseWorkout";

function Home() {
  const [showWorkout, setShowWorkout] = useState(false);
  const chooseWorkoutSection = useRef(null);
  const homeSection = useRef();
  const [requestedPlan, setRequestedPlan] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { plans, isLoading, isError, message } = useSelector((state) => state.plans);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/");
    }

    dispatch(getPlans());

    return () => {
      dispatch(resetPlans());
      dispatch(resetDraft());
    };
  }, [user, navigate, isError, message, dispatch]);

  const onClick = (e) => {
    let chosenPlan;
    plans.forEach((plan) => {
      if (plan._id === e.currentTarget.attributes.planid.value) chosenPlan = plan;
    });

    setRequestedPlan(chosenPlan);

    setShowWorkout(true);
  };

  return (
    <>
      <div className={image.backgroundImageHome}></div>
      <section ref={homeSection} className={layout.content__wrapper}>
        {isLoading !== true && (
          <div className={layout.threeRow__grid__layout}>
            <header className={styles.home__header}>
              <div className={styles.home__left}>
                <span className={styles.home__username}>{user && user.name}</span>
              </div>
              <div className={styles.home__right}>
                <span onClick={onLogout} id={styles.logOut}>
                  log out
                </span>
              </div>
              <div className={styles.spacer}></div>
            </header>

            <div className={styles.home__main}>
              <p className={styles.home__p}>
                Are you r<span className={styles.alternative}>e</span>ady to make
                <span className={styles.underline}>
                  <span className={styles.alternative}> n</span>ew PRs?
                </span>
                <span> C</span>
                <span className={styles.alternative}>h</span>oose your wo
                <span className={styles.alternative}>r</span>kout plan and{" "}
                <span className={styles.underline}>
                  start crush
                  <span className={styles.alternative}>i</span>ng it!
                </span>
              </p>
              {plans.length > 0 ? (
                <div className={styles.home__plans}>
                  {plans.map((el, index) => (
                    <div
                      onClick={onClick}
                      className={styles.home__plan}
                      key={el._id}
                      planid={el._id}
                    >
                      <div className={styles.home__planInner}>
                        <span>{el.name}</span>
                        <span className={styles.routine}>{el.routine}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className={btnStyles.btns__row}>
              <Link
                className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}
                to="/create-plan/routine"
              >
                <span>Create plan</span>
              </Link>
            </div>
          </div>
        )}
      </section>
      <ChooseWorkout
        homeSection={homeSection}
        requestedPlan={requestedPlan}
        showWorkout={showWorkout}
        setShowWorkout={setShowWorkout}
        chooseWorkoutSection={chooseWorkoutSection}
      />
    </>
  );
}

export default Home;
