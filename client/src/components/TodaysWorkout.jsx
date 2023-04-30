import React, { useState, useEffect, useContext } from 'react'
import Card from 'react-bootstrap/Card';
import WeightAdd from './WeightAdd';
import { UserContext } from "../context/user";

const TodaysWorkout = ({ workout }) => {
    const [associatedLifts, setAssociatedLifts] = useState([])
    const { user } = useContext(UserContext);

    useEffect(() => {
        fetch(`/workoutlifts/${workout.id}`)
        .then ((resp) => {
          if (resp.ok) {
              resp.json().then((lifts) => setAssociatedLifts(lifts))
          }
      })}, []);

  return (
    <Card style={{ width: '40rem', marginBottom: '10px' }} key={workout.id}>
            <Card.Header>{workout.name}</Card.Header>
            <Card.Body>
                <Card.Title className="mb-2 text-muted" >{workout.day_of_the_week}</Card.Title>
                <ul>
                { associatedLifts.map(lift => 
                <WeightAdd key={ lift.id } lift={ lift } user={ user } />
                )}
            </ul>
            </Card.Body>
    </Card>
  )
}

export default TodaysWorkout