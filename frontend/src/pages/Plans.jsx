import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPlans, resetPlans, deletePlan } from "../features/plans/planSlice";
import { resetChosenPlan } from "../features/plans/planToChangeSlice";

import layout from "../css/layout.module.css";
import styles from "../css/exercise.module.css";
import btnStyles from "../css/buttons.module.css";
import nav from "../css/nav.module.css";

import PlanDetails from "../components/planDetails/PlanDetails";

function Plans() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { plans, isError, message } = useSelector((state) => state.plans);
  const { plan_id } = useSelector((state) => state.chosenPlan);

  const [actionContainerShow, setActionContainerShow] = useState(false);
  const actionContainer = useRef(null);

  useEffect(() => {
    if (isError) console.log(message);

    dispatch(getPlans());
    dispatch(resetChosenPlan());

    return () => {
      dispatch(resetPlans());
    };
  }, [isError, message, dispatch]);

  useEffect(() => {
    if (actionContainerShow) {
      actionContainer.current.classList.add(layout.action__container__visible);
    } else {
      actionContainer.current.classList.remove(layout.action__container__visible);
    }
  }, [actionContainerShow]);

  const onClick = () => {
    navigate("/change-plan");
  };
  return (
    <>
      <section className={layout.content__wrapper}>
        <div
          ref={actionContainer}
          className={`${layout.twoRow__grid__layout} ${layout.action__container}`}
        >
          <nav className={nav.nav}>
            <span onClick={() => setActionContainerShow(false)} className={nav.arrow__link}>
              ←
            </span>
          </nav>
          <div className={btnStyles.btns__col}>
            <button onClick={onClick} className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}>
              <span>edit plan</span>
            </button>
            <button
              onClick={() => {
                dispatch(deletePlan(plan_id));
                setActionContainerShow(false);
              }}
              className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}
            >
              <span>remove plan</span>
            </button>
          </div>
        </div>
        <div className={layout.threeRow__grid__layout}>
          <nav className={nav.nav}>
            <Link to="/home">
              <span className={nav.arrow__link}>←</span>
            </Link>
            <span onClick={() => window.location.reload()} className={nav.text__link}>
              Refresh
            </span>
          </nav>
          <div
            style={{ justifyContent: "unset" }}
            className={`${layout.flex__layout} ${styles.exercises__wrapper}`}
          >
            {plans.map((plan) => (
              <PlanDetails
                key={plan._id}
                plan={plan}
                actionContainer={actionContainer}
                actionContainerShow={actionContainerShow}
                setActionContainerShow={setActionContainerShow}
              />
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
