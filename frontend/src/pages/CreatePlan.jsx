import React, { useState, useRef } from "react";

import ChooseRoutine from "../components/chooseRoutine/ChooseRoutine";
import RoutineVolume from "../components/routineVolume/RoutineVolume";
import AddExercises from "../components/addExercises/AddExercises";

export default function CreatePlan() {
  const [routineType, setRoutineType] = useState();
  const [routineVolume, setRoutineVolume] = useState();

  const [showVolume, setShowVolume] = useState();
  const volumeSection = useRef(null);

  const [showAddExercises, setShowAddExercises] = useState();
  const addExercisesSection = useRef(null);

  const [showPreview, setShowPreview] = useState();
  const previewSection = useRef(null);

  const [showNamePlan, setShowNamePlan] = useState();
  const namePlanSection = useRef(null);
  return (
    <>
      <ChooseRoutine
        setRoutineType={setRoutineType}
        routineType={routineType}
        setShowVolume={setShowVolume}
      />
      <RoutineVolume
        setRoutineVolume={setRoutineVolume}
        volumeSection={volumeSection}
        showVolume={showVolume}
        setShowVolume={setShowVolume}
        setShowAddExercises={setShowAddExercises}
      />
      <AddExercises
        addExercisesSection={addExercisesSection}
        showAddExercises={showAddExercises}
        setShowAddExercises={setShowAddExercises}
        routineType={routineType}
        routineVolume={routineVolume}
        setShowPreview={setShowPreview}
        showPreview={showPreview}
        previewSection={previewSection}
        setShowNamePlan={setShowNamePlan}
        namePlanSection={namePlanSection}
        showNamePlan={showNamePlan}
      />
    </>
  );
}
