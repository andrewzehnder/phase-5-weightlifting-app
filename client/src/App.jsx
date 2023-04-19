import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from "./context/user";
import NavBar from './components/NavBar';
import Home from './components/Home';
import Lifts from './components/Lifts';
import Workouts from './components/Workouts';
import Programs from './components/Programs';
import Login from './components/Login';
import AddLift from './components/AddLift';



function App() {
  return (
    <Router>
      <UserProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home /> } />
          <Route path="/lifts" element={<Lifts /> } />
          <Route path="/workouts" element={<Workouts /> } />
          <Route path="/programs" element={<Programs /> } />
          <Route path="/login" element={<Login /> } />
          <Route path="/addlift" element={<AddLift /> } />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
