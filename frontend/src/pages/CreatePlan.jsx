import React, { useState, useEffect, useRef } from "react";

import ChooseRoutine from "../components/ChooseRoutine";
import RoutineVolume from "../components/RoutineVolume";
import AddExercises from "../components/AddExercises";

export default function CreatePlan() {
  const [routineType, setRoutineType] = useState();
  const [routineVolume, setRoutineVolume] = useState();

  const [showVolume, setShowVolume] = useState();
  const volumeSection = useRef(null);

  const [showAddExercises, setShowAddExercises] = useState();
  const addExercisesSection = useRef(null);

  const [showPreview, setShowPreview] = useState();
  const previewSection = useRef(null);
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
      />
    </>
  );
}
