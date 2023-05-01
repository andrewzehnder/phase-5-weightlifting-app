import React from 'react'
import TodaysWorkout from "./TodaysWorkout";

function Home ({ todaysWorkout }) {

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