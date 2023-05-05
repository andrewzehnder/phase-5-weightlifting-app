import React from 'react'
import TodaysWorkout from "./TodaysWorkout";
import Form from 'react-bootstrap/Form';

function Home ({ todaysWorkout }) {

    return (
        <Form>
          <Form.Group>
            <Form.Label as="h2" style={{ marginTop: '10px', marginLeft: '20px' }}>Today's Workout</Form.Label>
            {todaysWorkout.id ? (
              <TodaysWorkout key={todaysWorkout.id} workout={todaysWorkout} />
            ) : (
              <Form.Label style={{ marginTop: '10px', marginLeft: '20px' }}>No Workout Available</Form.Label>
            )}
          </Form.Group>
        </Form>
      );
      
}

export default Home;