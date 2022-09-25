import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Home from "./pages/Home";
import Exercises from "./pages/Exercises";
import CreateExercise from "./pages/CreateExercise";

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
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
