import React, { useContext, useState, useEffect } from 'react'
import TodaysWorkout from "./TodaysWorkout";
import { UserContext } from "../context/user";

function Home () {
    const [todaysWorkout, setTodaysWorkout] = useState([]);
    const { user } = useContext(UserContext);


    useEffect(() => {
        fetch("/todaysworkouts")
        .then ((resp) => {
          if (resp.ok) {
              resp.json().then((workouts) => setTodaysWorkout(workouts))
          }
      })}, [user]);


    return (
        <>
        <h2><u>Today's Workout</u></h2>
        { todaysWorkout.map(workout => 
            <TodaysWorkout key={ workout.id } workout={ workout } />
        )}
        </>
    )
}

export default Home;