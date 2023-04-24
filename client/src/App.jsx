import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from "./context/user";
import NavBar from './components/NavBar';
import Home from './components/Home';
import Lifts from './components/Lifts';
import Workouts from './components/Workouts';
import Programs from './components/Programs';
import Login from './components/Login';
import LiftsAdd from './components/LiftsAdd';
import WorkoutsAdd from './components/WorkoutsAdd';
import ProgramsAdd from './components/ProgramsAdd';



function App() {
  const [allLifts, setAllLifts] = useState([]);
  const [allWorkouts, setAllWorkouts] = useState([]);
  const [allPrograms, setAllPrograms] = useState([]);

  useEffect(() => {
      fetch("/lifts_all")
      .then ((resp) => {
        if (resp.ok) {
            resp.json().then((lifts) => setAllLifts(lifts))
        }
  })}, []);

  useEffect(() => {
    fetch("/workouts_all")
    .then ((resp) => {
      if (resp.ok) {
          resp.json().then((workouts) => setAllWorkouts(workouts))
      }
  })}, []);

  useEffect(() => {
    fetch("/programs_all")
    .then ((resp) => {
      if (resp.ok) {
          resp.json().then((programs) => setAllPrograms(programs))
      }
  })}, []);

  const handleAddLift = newLift => {
    setAllLifts([...allLifts, newLift])
  }

  const handleAddWorkout = newWorkout => {
    setAllWorkouts([...allWorkouts, newWorkout.workout])
  }

  const handleAddProgram = newProgram => {
    console.log(newProgram, newProgram.program)
    setAllPrograms([...allPrograms, newProgram.program])
  }

  return (
    <Router>
      <UserProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lifts" element={<Lifts allLifts={ allLifts } />} />
          <Route path="/workouts" element={<Workouts allWorkouts={ allWorkouts }/>} />
          <Route path="/programs" element={<Programs allPrograms={ allPrograms } />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addlift" element={<LiftsAdd handleAddLift={ handleAddLift }/>} />
          <Route path="/addworkout" element={<WorkoutsAdd handleAddWorkout={  handleAddWorkout } allLifts={ allLifts } />} />
          <Route path="/addprogram" element={<ProgramsAdd handleAddProgram= { handleAddProgram } allWorkouts={ allWorkouts }/>} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
