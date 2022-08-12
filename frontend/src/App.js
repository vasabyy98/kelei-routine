import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Home from "./pages/Home";
import ChooseRoutine from "./components/chooseRoutine/ChooseRoutine";
import RoutineVolume from "./components/routineVolume/RoutineVolume";
import AddFullbodyExercises from "./components/addFullbodyExercises/AddFullbodyExercises";
import AddUpperSplitExercises from "./components/upperLowerSplit/AddUpperSplitExercises";
import AddLowerSplitExercises from "./components/upperLowerSplit/AddLowerSplitExercises";
import AddPushExercises from "./components/ppl/AddPushExercises";
import AddPullExercises from "./components/ppl/AddPullExercises";
import AddLegsExercises from "./components/ppl/AddLegsExercises";
import PlanPreview from "./components/planPreview/PlanPreview";
import NamePlan from "./components/namePlan/NamePlan";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/create-plan/routine" element={<ChooseRoutine />} />
            <Route path="/create-plan/volume" element={<RoutineVolume />} />
            <Route path="/create-plan/fullbody-exercises" element={<AddFullbodyExercises />} />
            <Route path="/create-plan/upperSplit-exercises" element={<AddUpperSplitExercises />} />
            <Route path="/create-plan/lowerSplit-exercises" element={<AddLowerSplitExercises />} />
            <Route path="/create-plan/push-exercises" element={<AddPushExercises />} />
            <Route path="/create-plan/pull-exercises" element={<AddPullExercises />} />
            <Route path="/create-plan/legs-exercises" element={<AddLegsExercises />} />
            <Route path="/create-plan/preview" element={<PlanPreview />} />
            <Route path="/create-plan/name-plan" element={<NamePlan />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
