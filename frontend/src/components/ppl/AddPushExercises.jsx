import React, { useState, useEffect, useRef } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setPushDayExercises, setUnit } from "../../features/plans/planDraftSlice";

import ExerciseForm from "../addExerciseForm/ExerciseForm";
import ExerciseList from "../addedExercises/ExerciseList";

import layout from "../../css/layout.module.css";
import btnStyles from "../../css/buttons.module.css";

import Header from "../header/Header";

function AddExercises() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const draft = useSelector((state) => state.planDraft);

  const [pushDayExercises, setPushExercises] = useState(draft.pushDayExercises);
  const [massUnit, setMassUnit] = useState("kg");

  const pushExercisesSection = useRef();

  const nextLink = useRef();

  const addExercise = (exerciseInfo, unitInfo) => {
    setPushExercises((prev) => [...prev, exerciseInfo]);
    setMassUnit(unitInfo);
  };

  const removeExercise = (e) => {
    let val = e.currentTarget.getAttribute("name").toLowerCase();
    setPushExercises(pushDayExercises.filter((exercise) => exercise.exercise !== val));
  };

  const removeAllExercises = () => {
    setPushExercises("");
  };

  const onClick = () => {
    dispatch(setUnit(massUnit));
  };

  useEffect(() => {
    if (draft.routineType.length === 0) {
      navigate("/create-plan/routine");
    }

    if (pushDayExercises.length > 0) {
      nextLink.current.classList.remove(btnStyles.disabledBtn);
    } else {
      nextLink.current.classList.add(btnStyles.disabledBtn);
    }

    dispatch(setPushDayExercises(pushDayExercises));
  }, [pushDayExercises]);
  return (
    <>
      <section ref={pushExercisesSection} className={`${layout.content__wrapper__bg} `}>
        <div className={layout.twoRow__grid__layout}>
          <div className={layout.flex__layout}>
            <Header line1={"add your"} line2={"push day"} line3={"exercises"} />
            <div className={layout.added__exercises}>
              <ExerciseForm
                addExercise={addExercise}
                show={show}
                onClose={() => setShow(false)}
                section={pushExercisesSection}
              />
              <ExerciseList
                fullbodyExercises={pushDayExercises}
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
                {pushDayExercises.length > 0 && (
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
            <Link to="/create-plan/volume" className={`${btnStyles.btn} ${btnStyles.secondaryBtn}`}>
              <span>go back</span>
            </Link>
            <Link
              ref={nextLink}
              to="/create-plan/pull-exercises"
              onClick={onClick}
              className={`${btnStyles.btn} ${btnStyles.primaryBtn} ${btnStyles.disabledBtn}`}
            >
              <span>next step</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default AddExercises;
