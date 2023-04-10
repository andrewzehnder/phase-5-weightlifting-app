import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Lifts from './components/Lifts';
import Workouts from './components/Workouts';
import Programs from './components/Programs';
import Login from './components/Login';



function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home /> } />
        <Route path="/lifts" element={<Lifts /> } />
        <Route path="/workouts" element={<Workouts /> } />
        <Route path="/programs" element={<Programs /> } />
        <Route path="/login" element={<Login /> } />
      </Routes>
    </Router>
  );
}

export default App;
