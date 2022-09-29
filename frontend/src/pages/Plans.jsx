import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPlans, resetPlans } from "../features/plans/planSlice";

import layout from "../css/layout.module.css";
import styles from "../css/exercise.module.css";
import btnStyles from "../css/buttons.module.css";
import nav from "../css/nav.module.css";
import PlanDetails from "../components/planDetails/PlanDetails";

function Plans() {
  const dispatch = useDispatch();

  const { plans, isError, message } = useSelector((state) => state.plans);

  useEffect(() => {
    if (isError) console.log(message);

    dispatch(getPlans());

    return () => {
      dispatch(resetPlans());
    };
  }, [isError, message, dispatch]);
  return (
    <>
      <section className={layout.content__wrapper}>
        <div className={layout.threeRow__grid__layout}>
          <nav className={nav.nav}>
            <Link to="/home">
              <span className={nav.arrow__link}>←</span>
            </Link>
          </nav>
          <div
            style={{ justifyContent: "unset" }}
            className={`${layout.flex__layout} ${styles.exercises__wrapper}`}
          >
            {plans.map((plan) => (
              <PlanDetails key={plan._id} plan={plan} />
            ))}
          </div>
          <div className={btnStyles.btns__row}>
            <Link className={`${btnStyles.btn} ${btnStyles.primaryBtn}`} to="/create-plan">
              <span>create new plan</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Plans;
