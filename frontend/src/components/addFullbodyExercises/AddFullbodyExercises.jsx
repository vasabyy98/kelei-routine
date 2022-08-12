import React, { useState, useEffect, useRef } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setFullbodyExercises, setUnit } from "../../features/plans/planDraftSlice";

import ExerciseForm from "../addExerciseForm/ExerciseForm";
import ExerciseList from "../addedExercises/ExerciseList";

import layout from "../../css/layout.module.css";
import btnStyles from "../../css/buttons.module.css";

import Header from "../header/Header";

function AddExercises() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const draft = useSelector((state) => state.planDraft);

  const [fullbodyExercises, setExercises] = useState(draft.fullbodyExercises);
  const [massUnit, setMassUnit] = useState("kg");

  const fullbodySection = useRef();

  const nextLink = useRef();

  const addExercise = (exerciseInfo, unitInfo) => {
    setExercises((prev) => [...prev, exerciseInfo]);
    setMassUnit(unitInfo);
  };

  const removeExercise = (e) => {
    let val = e.currentTarget.getAttribute("name").toLowerCase();
    setExercises(fullbodyExercises.filter((exercise) => exercise.exercise !== val));
  };

  const removeAllExercises = () => {
    setExercises("");
  };

  const onClick = () => {
    dispatch(setUnit(massUnit));
  };

  useEffect(() => {
    if (draft.routineType.length === 0) {
      navigate("/create-plan/routine");
    }

    if (fullbodyExercises.length > 0) {
      nextLink.current.classList.remove(btnStyles.disabledBtn);
    } else {
      nextLink.current.classList.add(btnStyles.disabledBtn);
    }

    dispatch(setFullbodyExercises(fullbodyExercises));
  }, [fullbodyExercises]);
  return (
    <>
      <section ref={fullbodySection} className={`${layout.content__wrapper__bg}`}>
        <div className={layout.twoRow__grid__layout}>
          <div className={layout.flex__layout}>
            <Header line1={"add your"} line2={"full body"} line3={"exercises"} />
            <div className={layout.added__exercises}>
              <ExerciseForm
                addExercise={addExercise}
                show={show}
                onClose={() => setShow(false)}
                section={fullbodySection}
              />
              <ExerciseList
                fullbodyExercises={fullbodyExercises}
                massUnit={massUnit}
                removeExercise={removeExercise}
              />
              <div className={btnStyles.btns__col}>
                <button
                  onClick={() => setShow(true)}
                  className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}
                >
                  <span>add exercise</span>
                </button>
                {fullbodyExercises.length > 0 && (
                  <button
                    onClick={removeAllExercises}
                    className={`${btnStyles.btn} ${btnStyles.secondaryBtn}`}
                  >
                    <span>remove all exercises</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: "var(--padding)" }} className={`${btnStyles.btns__row}`}>
            <Link className={`${btnStyles.btn} ${btnStyles.secondaryBtn}`} to="/create-plan/volume">
              <span>go back</span>
            </Link>
            <Link
              ref={nextLink}
              onClick={onClick}
              className={`${btnStyles.btn} ${btnStyles.primaryBtn} ${btnStyles.disabledBtn}`}
              to="/create-plan/preview"
            >
              <span>preview</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default AddExercises;
