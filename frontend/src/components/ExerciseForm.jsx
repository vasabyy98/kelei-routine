import React, { useState, useEffect, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { addExercise } from "../features/plans/planSlice";

import styles from "../css/signIn.module.css";
import btnStyles from "../css/buttons.module.css";
import layout from "../components/exerciseForm.module.css";
import other from "../css/createPlan.module.css";

export default function ExerciseForm({ addExercise, show, onClose }) {
  const [exerciseInfo, setExerciseInfo] = useState({
    exercise: "",
    weight: "",
  });

  const [massUnit, setUnit] = useState("kg");

  const modalRef = useRef(null);

  useEffect(() => {
    if (show) {
      modalRef.current.classList.add(layout.visible);
    } else {
      modalRef.current.classList.remove(layout.visible);
    }
  }, [show]);

  const changeUnit = () => {
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
      <form onSubmit={onSubmit} className={layout.exercise__form}>
        <div className={`${styles.form__group} ${styles.stacked__group}`}>
          <input
            name="exercise"
            type="text"
            value={exerciseInfo.exercise}
            className={styles.form__control}
            placeholder="type exercise name here..."
            onChange={handleChange}
          />
          <div className={other.relative}>
            <input
              name="weight"
              type="number"
              value={exerciseInfo.weight}
              className={styles.form__control}
              placeholder="type weight here..."
              onChange={handleChange}
            />
            <div onClick={changeUnit} className={other.weight}>
              {massUnit}
            </div>
          </div>
        </div>
        <div className={`${btnStyles.form__btns}`}>
          <button type="submit" className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}>
            <span>add exercise</span>
          </button>
        </div>
      </form>
    </section>
  );
}
