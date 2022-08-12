import React, { useEffect, useState, useRef } from "react";

import { useNavigate, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { createWorkoutPlan } from "../../features/plans/planSlice";

import layout from "../../css/layout.module.css";
import changeThis from "../addExerciseForm/exerciseForm.module.css";
import styles from "../../css/signIn.module.css";
import btnStyles from "../../css/buttons.module.css";
import image from "../../css/backgroundImage.module.css";
import { setName } from "../../features/plans/planDraftSlice";

function NamePlan() {
  const draft = useSelector((state) => state.planDraft);

  const input = useRef();

  const [formData, setFormData] = useState({
    workoutName: draft.name,
  });

  const { workoutName } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (input.current.value === "") {
      input.current.focus();
    }

    dispatch(setName(workoutName));
  }, [workoutName]);

  const createPlan = (e) => {
    e.preventDefault();

    dispatch(createWorkoutPlan(draft));
    navigate("/home");
  };
  return (
    <>
      <section className={`${layout.content__wrapper__bg} `}>
        <div className={image.backgroundImageNamePlan}></div>
        <div className={layout.twoRow__grid__layout}>
          <div className={layout.flex__layout}>
            <header className={styles.header}>
              <div className={styles.header__row}>
                <span className={styles.header__text}>
                  a<span className={styles.alternative}>l</span>most
                </span>
              </div>
              <div className={styles.header__row}>
                <span className={styles.header__text}>there</span>
              </div>
            </header>
            <form onSubmit={createPlan} className={`${styles.form} `}>
              <div className={styles.form__inner}>
                <div className={styles.form__group}>
                  <input
                    ref={input}
                    type="text"
                    className={styles.form__control}
                    id="workoutName"
                    name="workoutName"
                    value={workoutName}
                    onChange={onChange}
                    placeholder="workout name"
                  />
                  <div className={styles.spacer}></div>
                </div>
              </div>
              <div className={`${btnStyles.btns__row} ${btnStyles.absolute}`}>
                <Link
                  to="/create-plan/preview"
                  className={`${btnStyles.btn} ${btnStyles.secondaryBtn}`}
                >
                  <span>go back</span>
                </Link>
                <button type="submit" className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}>
                  <span>let's rock!</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default NamePlan;
