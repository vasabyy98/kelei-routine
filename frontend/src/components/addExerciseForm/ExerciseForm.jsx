import React, { useState, useEffect, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { addExercise } from "../features/plans/planSlice";

import styles from "../../css/signIn.module.css";
import btnStyles from "../../css/buttons.module.css";
import layout from "../addExerciseForm/exerciseForm.module.css";

export default function ExerciseForm({ addExercise, show, onClose, section }) {
  const [exerciseInfo, setExerciseInfo] = useState({
    exercise: "",
    currentWeight: "",
    initialWeight: 0,
    restTime: 0,
  });

  const [massUnit, setUnit] = useState("kg");

  const modalRef = useRef(null);
  const exerciseInput = useRef();

  useEffect(() => {
    if (show) {
      modalRef.current.classList.add(layout.visible);
      section.current.classList.add(layout.hide);
    } else {
      modalRef.current.classList.remove(layout.visible);
      section.current.classList.remove(layout.hide);
    }

    if (exerciseInput.current.value === "" && show === true) {
      exerciseInput.current.focus();
    }
  }, [show, exerciseInfo]);

  const changeUnit = (e) => {
    e.preventDefault();

    if (massUnit === "kg") {
      setUnit("lb");
    } else {
      setUnit("kg");
    }
  };

  const handleChange = (e) => {
    setExerciseInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    e.target.name === "currentWeight" &&
      setExerciseInfo((prevState) => ({
        ...prevState,
        initialWeight: e.target.value,
      }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (e.target[0].value !== "" && e.target[1].value !== "") {
      addExercise(exerciseInfo, massUnit);

      setExerciseInfo({ exercise: "", weight: "" });

      onClose();
    }
  };

  return (
    <section ref={modalRef} className={layout.wrapper}>
      <div onClick={onClose} className={layout.exercise__close}></div>
      <form onSubmit={onSubmit} className={`${styles.form} `}>
        <div className={styles.form__inner}>
          <div className={styles.form__group}>
            <input
              ref={exerciseInput}
              name="exercise"
              type="text"
              value={exerciseInfo.exercise}
              className={styles.form__control}
              placeholder="exercise name"
              onChange={handleChange}
            />
            <div className={styles.spacer}></div>
          </div>
          <div className={styles.form__group}>
            <input
              name="currentWeight"
              type="number"
              value={exerciseInfo.weight}
              className={styles.form__control}
              placeholder="weight"
              onChange={handleChange}
            />
            <div className={styles.spacer}></div>
            <div className={layout.weight}>{massUnit}</div>
          </div>
          <div className={styles.clarification}>
            <p>In case bodyweight is used, just type your weight (+ weighted belt if used)</p>
          </div>
        </div>
        <div
          style={{ transform: "translateX(-50%)", left: "50%" }}
          className={`${btnStyles.btns__row} ${btnStyles.absolute}`}
        >
          <button onClick={changeUnit} className={`${btnStyles.btn} ${btnStyles.secondaryBtn}`}>
            <span>change mass unit</span>
          </button>
          <button type="submit" className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}>
            <span>add exercise</span>
          </button>
        </div>
      </form>
    </section>
  );
}
