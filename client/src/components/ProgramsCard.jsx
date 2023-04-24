import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';

const ProgramsCard = ({ program, user }) => {
  const [associatedWorkouts, setassociatedWorkouts] = useState([]);
  console.log("program_card", user)
    
    useEffect(() => {
        fetch(`/programworkouts/${program.id}`)
        .then ((resp) => {
          if (resp.ok) {
              resp.json().then((workouts) => setassociatedWorkouts(workouts))
          }
      })}, []);

    return (
        <Card style={{ width: '18rem', marginBottom: '10px' }}>
        <Card.Header>{program.name}</Card.Header>
        <Card.Body>
          {associatedWorkouts.map(workout => 
          <Card.Text key={workout}>
          {workout}
          </Card.Text>)}
        </Card.Body>
        </Card>
  )
}

export default ProgramsCard