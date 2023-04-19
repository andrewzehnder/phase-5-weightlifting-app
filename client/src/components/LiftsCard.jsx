import React from 'react'
import Card from 'react-bootstrap/Card';

const LiftsCard = ({ lift }) => {
  return (
    <Card style={{ width: '18rem', marginBottom: '10px' }}>
      <Card.Body>
        <Card.Title>{lift.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{lift.body_part}</Card.Subtitle>
      </Card.Body>
    </Card>
  )
}

export default LiftsCard