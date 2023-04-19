import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from "../context/user";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import WorkoutsCard from './WorkoutsCard';

const Workouts = () => {
  const { user } = useContext(UserContext);
  const [workoutsList, setWorkoutsList] = useState([]);

  useEffect(() => {
    fetch("/workouts_all")
    .then((resp) => resp.json())
    .then((workouts) => {
      setWorkoutsList(workouts);
    })
}, []);
  return (
    <Form>
    <Form.Group>
        <Button type="submit" variant="outline-primary" href="/addworkout" style={{ marginTop: '20px', marginBottom: '10px', marginLeft: '30px' }}>Add New Workout</Button>
        <ul>
            { workoutsList.map(workout => 
            <WorkoutsCard key={ workout.id } workout={ workout } user={ user } />
            )}
        </ul>
    </Form.Group>
</Form>
  )
}

export default Workouts