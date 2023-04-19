import React from 'react'
import Card from 'react-bootstrap/Card';

const ProgramsCard = ({ program }) => {
    return (
        <Card style={{ width: '18rem', marginBottom: '10px' }}>
          <Card.Body>
            <Card.Title>{program.name}</Card.Title>
          </Card.Body>
        </Card>
  )
}

export default ProgramsCard