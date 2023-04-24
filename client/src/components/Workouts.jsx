import React, { useContext } from 'react'
import { UserContext } from "../context/user";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import WorkoutsCard from './WorkoutsCard';

const Workouts = ({ allWorkouts }) => {
  const { user } = useContext(UserContext);

  return (
    <Form>
    <Form.Group>
        <Button type="submit" variant="outline-primary" href="/addworkout" style={{ marginTop: '20px', marginBottom: '10px', marginLeft: '30px' }}>Add New Workout</Button>
        <ul>
            { allWorkouts.map(workout => 
            <WorkoutsCard key={ workout.id } workout={ workout } user={ user } />
            )}
        </ul>
    </Form.Group>
</Form>
  )
}

export default Workouts