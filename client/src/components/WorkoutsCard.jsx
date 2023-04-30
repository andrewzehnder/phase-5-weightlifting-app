import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';

const WorkoutsCard = ({ workout }) => {
    const [associatedLifts, setAssociatedLifts] = useState([])
    
    useEffect(() => {
        fetch(`/workoutlifts/${workout.id}`)
        .then ((resp) => {
          if (resp.ok) {
              resp.json().then((lifts) => setAssociatedLifts(lifts))
          }
      })}, []);


  return (
    <Card style={{ width: '18rem', marginBottom: '10px' }}>
      <Card.Header>{workout.name}</Card.Header>
      <Card.Body>
        <Card.Title className="mb-2 text-muted underline" >{workout.day_of_the_week}</Card.Title>
        {associatedLifts.map(lift => 
        <Card.Text key={lift}>
        {lift}
        </Card.Text>)}
      </Card.Body>
    </Card>
  )
}

export default WorkoutsCard