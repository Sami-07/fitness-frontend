import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import About from "./components/About";
import Assessment from "./components/Assessment";
import Dashboard from "./components/Dashboard";
import FoodTracker from "./components/FoodTracker";
import CustomMeal from "./components/CustomMeal";
import TrackWorkout from "./components/TrackWorkout";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import MacroNutrientsContent from "./components/MacroNutrientsContent";
import AddCustomMeal from "./components/AddCustomMeal";
import Register from "./components/Register";
import Login from "./components/Login";
import { auth } from "./firebase/config";
import {  loginExistingUser, logout } from "./features/Auth/authSlice";
import WeightTracker from "./components/WeightTracker";
import EditAssessment from "./components/EditAssessment";
import WorkoutHistory from "./components/WorkoutHistory";

import WaterIntake from "./components/WaterIntake";
function App() {

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {

        dispatch(loginExistingUser(user));
      } else {
        // User is logged out

        dispatch(logout());
        // window.location.href = "/"
      }
    });

    // Cleanup the observer when the component unmounts
    return () => unsubscribe();
  }, []);


  return (
    <div className="">
      <div >
        <Navbar />
      </div>
      <div className="mt-12 ">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/editassessment" element={<EditAssessment />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/foodtracker" element={<FoodTracker />} />
            <Route path="/nutrientsinfo" element={<MacroNutrientsContent />} />
            <Route path="/custommeal" element={<CustomMeal />} />
            <Route path="/trackworkout" element={<TrackWorkout />} />
            <Route path="/workouthistory" element={<WorkoutHistory />} />    
            <Route path="/addcustommeal" element={<AddCustomMeal />} />
            <Route path="/weighttracker" element={<WeightTracker />} />
            <Route path="/waterintake" element={<WaterIntake />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
