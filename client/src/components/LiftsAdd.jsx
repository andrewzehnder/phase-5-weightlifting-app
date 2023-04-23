import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const LiftsAdd = ({ handleAddLift }) => {

  const [lift, setLift] = useState({
      name: "",
      body_part: ""
  })

  const navigate = useNavigate(0);

  const handleSubmit = e => {
     e.preventDefault();
     fetch('/lifts', {
         method: "POST",
         headers: {
             "Accept": "application/json",
             "Content-Type": "application/json"
         },
         body: JSON.stringify(lift)
     })
     .then(resp => resp.json())
     .then(data => {
         handleAddLift(data)
         navigate(`/lifts`);
     }) 
  }

  const handleChange = e => {
      setLift({
          ...lift,
          [e.target.name]: e.target.value
      })
  }

return (
  <>
    <Form onSubmit={ handleSubmit }>
    <Form.Group style={{ padding: '10px' }}>
    <h2>Add New Lift</h2>
            <Form.Label>Lift Name:</Form.Label>
                <Form.Control
                    required
                    id="name"
                    type="text"
                    name= "name"
                    value={ lift.name } 
                    onChange={ handleChange }
                />

            <Form.Label>Body Part:</Form.Label>
                <Form.Control
                    required
                    id="body_part"
                    type="text"
                    name="body_part"
                    value={ lift.body_part } 
                    onChange={ handleChange }
                    style={{ marginBottom: '10px' }}
                />

      <Button type="submit" variant="light">Save</Button>
      </Form.Group>
  </Form>
  </>
)
}

export default LiftsAdd