import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import Form from './components/Form';
import About from "./components/About";
import Assessment from "./components/Assessment";
import Dashboard from "./components/Dashboard";
import FoodTracker from "./components/FoodTracker";
import CustomMeal from "./components/CustomMeal";
import AddWorkout from "./components/AddWorkout";
import TrackWorkout from "./components/TrackWorkout";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import MacroNutrientsContent from "./components/MacroNutrientsContent";
import AddCustomMeal from "./components/AddCustomMeal";
import Register from "./components/Register";
import Login from "./components/Login";
import { auth } from "./firebase/config";
import { login, loginExistingUser, logout } from "./features/Auth/authSlice";
import WeightTracker from "./components/WeightTracker";

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
      }
    });

    // Cleanup the observer when the component unmounts
    return () => unsubscribe();
  }, [dispatch]);

  console.log("check log in", isLoggedIn);
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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/foodtracker" element={<FoodTracker />} />
            <Route path="/nutrientsinfo" element={<MacroNutrientsContent />} />
            <Route path="/custommeal" element={<CustomMeal />} />
            <Route path="/addworkout" element={<AddWorkout />} />
            <Route path="/trackworkout" element={<TrackWorkout />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/addcustommeal" element={<AddCustomMeal />} />
            <Route path="/weighttracker" element={<WeightTracker />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
