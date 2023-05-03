import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserContext } from "./context/user";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Lifts from './components/Lifts';
import Workouts from './components/Workouts';
import Programs from './components/Programs';
import Login from './components/Login';
import LiftsAdd from './components/LiftsAdd';
import WorkoutsAdd from './components/WorkoutsAdd';
import ProgramsAdd from './components/ProgramsAdd';
import ProgramsEdit from './components/ProgramsEdit';


function App() {
  const [allLifts, setAllLifts] = useState([]);
  const [allWorkouts, setAllWorkouts] = useState([]);
  const [allPrograms, setAllPrograms] = useState([]);
  const [todaysWorkout, setTodaysWorkout] = useState([]);
  const { user } = useContext(UserContext);


  useEffect(() => {
      fetch("/todaysworkouts")
      .then ((resp) => {
        if (resp.ok) {
            resp.json().then((workouts) => setTodaysWorkout(workouts))
        }
    })}, [user]);
  
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

  // useEffect(() => {
  //   fetch("/todaysworkouts")
  //   .then ((resp) => {
  //     if (resp.ok) {
  //         resp.json().then((workouts) => setTodaysWorkout(workouts))
  //     }
  // })}, [user]);

  const handleAddLift = newLift => {
    setAllLifts([...allLifts, newLift])
  }

  const handleAddWorkout = newWorkout => {
    setAllWorkouts([...allWorkouts, newWorkout.workout])
  }

  const handleAddProgram = newProgram => {
    setAllPrograms([...allPrograms, newProgram.program])
  }

  const handleEditProgram = editedProgram => {
    const updatedPrograms = allPrograms.map(program => {
      if (program.id === editedProgram.program.id && program.name !== editedProgram.program.name) {
        return { ...program, name: editedProgram.program.name };
      }
      return program;
    });
    setAllPrograms(updatedPrograms);
  }

  const handleDeleteProgram = deletedProgram => {
    setAllPrograms((programsList) => 
      programsList.filter((program) => program.id !== deletedProgram.id)
  )}
  
  

  return (
    <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home todaysWorkout={ todaysWorkout }/>} />
          <Route path="/lifts" element={<Lifts allLifts={ allLifts } />} />
          <Route path="/workouts" element={<Workouts allWorkouts={ allWorkouts }/>} />
          <Route path="/programs" element={<Programs allPrograms={ allPrograms } handleDeleteProgram={ handleDeleteProgram }/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/addlift" element={<LiftsAdd handleAddLift={ handleAddLift }/>} />
          <Route path="/addworkout" element={<WorkoutsAdd handleAddWorkout={  handleAddWorkout } allLifts={ allLifts } />} />
          <Route path="/addprogram" element={<ProgramsAdd handleAddProgram= { handleAddProgram } allWorkouts={ allWorkouts } />} />
          <Route path="/program/:id" element={<ProgramsEdit allWorkouts={ allWorkouts } handleEditProgram={ handleEditProgram } />}/>
        </Routes>
    </Router>
  );
}

export default App;
