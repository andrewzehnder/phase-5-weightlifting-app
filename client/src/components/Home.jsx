import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';

function Home () {
    const [todaysWorkout, setTodaysWorkout] = useState([]);

    useEffect(() => {
        fetch("/todaysworkouts")
        .then ((resp) => {
          if (resp.ok) {
              resp.json().then((workouts) => setTodaysWorkout(workouts))
          }
      })}, []);

    return (
        <>
        { todaysWorkout.map(workout =>
            <Card style={{ width: '18rem', marginBottom: '10px' }} key={workout.id}>
            <Card.Header>{workout.name}</Card.Header>
            <Card.Body>
                <Card.Title className="mb-2 text-muted" >{workout.day_of_the_week}</Card.Title>
            </Card.Body>
            </Card>
        )}
        </>
    )
}

export default Home;