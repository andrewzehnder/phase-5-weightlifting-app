import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const ProgramsCard = ({ program, handleDeleteProgram }) => {
  const [associatedWorkouts, setassociatedWorkouts] = useState([]);
  const [programInfo, setProgramInfo] = useState([])

    
    useEffect(() => {
        fetch(`/programworkouts/${program.program_id}`)
        .then ((resp) => {
          if (resp.ok) {
              resp.json().then((workouts) => setassociatedWorkouts(workouts))
          }
      })}, []);

      useEffect(() => {
        fetch(`/program/${program.program_id}`)
        .then ((resp) => {
          if (resp.ok) {
              resp.json().then((programInfo) => setProgramInfo(programInfo))
          }
      })}, []);

    const handleDelete = e => {
      fetch(`/program/${program.program_id}`, {
        method: "DELETE"
      }).then ((resp) => {
        if (resp.ok) {
            console.log(program)
            handleDeleteProgram(program)
        }
    })
    }

    return (
        <Card style={{ width: '18rem', marginBottom: '10px' }}>
        <Card.Header>{programInfo.name}</Card.Header>
        <Card.Body>
          {associatedWorkouts.map(workout => 
          <Card.Text key={workout}>
          {workout}
          </Card.Text>)}
          <Button href={`/program/${program.program_id}`} type="submit" variant="outline-secondary" style={{ marginTop: '10px' }}>Edit Program</Button>
          <Button type="submit" variant="outline-danger" style={{ marginTop: '10px' }} onClick={ handleDelete }>Delete Program</Button>
        </Card.Body>
        </Card>
  )
}

export default ProgramsCard