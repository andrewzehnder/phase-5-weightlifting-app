import React from 'react'
import Card from 'react-bootstrap/Card';

const WorkoutsCard = ( {workout }) => {
  return (
    <Card style={{ width: '18rem', marginBottom: '10px' }}>
      <Card.Body>
        <Card.Title>{workout.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{workout.day_of_the_week}</Card.Subtitle>
      </Card.Body>
    </Card>
  )
}

export default WorkoutsCard