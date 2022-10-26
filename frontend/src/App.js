import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Home from "./pages/Home";
import Exercises from "./pages/Exercises";
import CreateExercise from "./pages/CreateExercise";
import ChangeExercise from "./pages/ChangeExercise";
import Plans from "./pages/Plans";
import CreatePlan from "./pages/CreatePlan";
import ChangePlan from "./pages/ChangePlan";
import ChooseSplit from "./pages/ChooseSplit";
import ChooseExercise from "./pages/ChooseExercise";
import RepCounter from "./pages/RepCounter";
import RepCounterHowTo from "./pages/RepCounterHowTo";

import DeviceSize from "./components/deviceSizeMessage/DeviceSize";

function App() {
  return (
    <>
      <DeviceSize />
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/create-exercise" element={<CreateExercise />} />
            <Route path="/change-exercise" element={<ChangeExercise />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/create-plan" element={<CreatePlan />} />
            <Route path="/change-plan" element={<ChangePlan />} />
            <Route path="/choose-split" element={<ChooseSplit />} />
            <Route path="/choose-exercise" element={<ChooseExercise />} />
            <Route path="/rep-counter" element={<RepCounter />} />
            <Route path="/rep-counter-how-to" element={<RepCounterHowTo />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
