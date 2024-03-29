import React, { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setCurrentPlan } from "../../features/plans/planToChangeSlice";

import { gsap } from "gsap";

import layout from "../../css/layout.module.css";
import styles from "../../css/exercise.module.css";
import btnStyles from "../../css/buttons.module.css";
import header from "../../css/header.module.css";

function PlanDetails({ plan, setActionContainerShow }) {
  useLayoutEffect(() => {
    gsap.fromTo(
      ".animate__item",
      {
        opacity: 0,
        yPercent: 50,
      },
      {
        yPercent: 0,
        opacity: 1,
        delay: 0.5,
        stagger: 0.1,
        duration: 1,
      }
    );
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showHideInfo = (e) => {
    const target = e.currentTarget.nextElementSibling;

    if (target.classList.length === 1) {
      target.classList.add(styles.show);
      e.currentTarget.children[1].textContent = "Hide info↑";
    } else {
      target.classList.remove(styles.show);
      e.currentTarget.children[1].textContent = "Show info↓";
    }
  };

  const onClick = () => {
    setActionContainerShow(true);
    dispatch(setCurrentPlan(plan));
  };
  return (
    <>
      <div
        key={plan._id}
        style={{ height: "unset" }}
        className={`${layout.flex__layout} ${"animate__item"}`}
      >
        <header onClick={showHideInfo} style={{ cursor: "pointer" }} className={header.header}>
          <h2 className={`${header.heading__h2}`}>{plan.planName}</h2>
          <button className={header.subheading}>Show info↓</button>
        </header>
        <div className={styles.exercise__details__wrapper}>
          <div className={styles.exercise__details}>
            <div className={styles.exercise__inner}>
              <span>Routine type:</span>
              <span style={{ textTransform: "uppercase" }}>{plan.routine}</span>
            </div>
            <div className={styles.exercise__inner}>
              <span>Volume:</span>
              <span style={{ textTransform: "capitalize" }}>{plan.volume}</span>
            </div>
          </div>
          <div className={btnStyles.btns__col}>
            <button onClick={onClick} className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}>
              <span>actions</span>
            </button>
            <button
              onClick={() => {
                dispatch(setCurrentPlan(plan));
                navigate("/choose-split");
              }}
              className={`${btnStyles.btn} ${btnStyles.secondaryBtn}`}
            >
              <span>start workout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlanDetails;
