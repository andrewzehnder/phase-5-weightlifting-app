import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const ProgramsCard = ({ program, handleDeleteProgram }) => {
  const [associatedWorkouts, setassociatedWorkouts] = useState([]);
    
    useEffect(() => {
        fetch(`/programworkouts/${program.id}`)
        .then ((resp) => {
          if (resp.ok) {
              resp.json().then((workouts) => setassociatedWorkouts(workouts))
          }
      })}, []);

    const handleDelete = e => {
      fetch(`/program/${program.id}`, {
        method: "DELETE"
    }).then ((resp) => {
        if (resp.ok) {
            handleDeleteProgram(program)
        }
    })
    }

    return (
        <Card style={{ width: '18rem', marginBottom: '10px' }}>
        <Card.Header>{program.name}</Card.Header>
        <Card.Body>
          {associatedWorkouts.map(workout => 
          <Card.Text key={workout}>
          {workout}
          </Card.Text>)}
          <Button href={`/program/${program.id}`} type="submit" variant="outline-secondary" style={{ marginTop: '10px' }}>Edit Program</Button>
          <Button type="submit" variant="outline-danger" style={{ marginTop: '10px' }} onClick={ handleDelete }>Delete Program</Button>
        </Card.Body>
        </Card>
  )
}

export default ProgramsCard