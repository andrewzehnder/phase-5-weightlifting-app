import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import WorkoutsCard from './WorkoutsCard';

const Workouts = ({ allWorkouts }) => {

  return (
    <Form>
    <Form.Group>
        <Button type="submit" variant="outline-primary" href="/addworkout" style={{ marginTop: '20px', marginBottom: '10px', marginLeft: '30px' }}>Add New Workout</Button>
        <ul>
            { allWorkouts.map(workout => 
            <WorkoutsCard key={ workout.id } workout={ workout }/>
            )}
        </ul>
    </Form.Group>
</Form>
  )
}

export default Workouts