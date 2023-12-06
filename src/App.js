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
function App() {

  return (
    <div className="">
    <div >
      <Navbar />
      </div>
      <div className="mt-12 ">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
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
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
