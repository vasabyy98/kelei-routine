import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePlan } from "../../features/plans/planSlice";
import { setCurrentPlan } from "../../features/plans/planToChangeSlice";

import layout from "../../css/layout.module.css";
import styles from "../../css/exercise.module.css";
import btnStyles from "../../css/buttons.module.css";
import header from "../../css/header.module.css";

function PlanDetails({ plan }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showHideInfo = (e) => {
    const target = e.currentTarget.nextElementSibling;

    const buttons = e.currentTarget.parentElement.children[1].children[1].children;
    const [btn1, btn2] = buttons;

    if (target.classList.length === 1) {
      target.classList.add(styles.show);
      e.currentTarget.children[1].textContent = "Hide info↑";
      btn1.classList.add(btnStyles.animate__btn);
      btn2.classList.add(btnStyles.animate__btn);
    } else {
      target.classList.remove(styles.show);
      e.currentTarget.children[1].textContent = "Show info↓";
      btn1.classList.remove(btnStyles.animate__btn);
      btn2.classList.remove(btnStyles.animate__btn);
    }
  };

  const onClick = () => {
    dispatch(setCurrentPlan(plan));
    navigate("/change-plan");
  };
  return (
    <>
      <div key={plan._id} style={{ height: "unset" }} className={layout.flex__layout}>
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
              <span>edit plan</span>
            </button>
            <button
              onClick={() => dispatch(deletePlan(plan._id))}
              className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}
            >
              <span>remove plan</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlanDetails;
