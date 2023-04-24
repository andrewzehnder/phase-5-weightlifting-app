import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const WorkoutsAdd = ({ handleAddWorkout, allLifts }) => {
    const [workout, setWorkout] = useState({
        name: "",
        day_of_the_week: ""
    })
    const [selectedLifts, setSelectedLifts] = useState([]);
    const navigate = useNavigate(0);
  
    const handleSubmit = e => {
       e.preventDefault();
       fetch('/workouts', {
           method: "POST",
           headers: {
               "Accept": "application/json",
               "Content-Type": "application/json"
           },
           body: JSON.stringify({ workout,
            lifts: selectedLifts})
       })
       .then(resp => resp.json())
       .then(data => {
           handleAddWorkout(data)
           navigate(`/workouts`);
       }) 
    }
  
    const handleChange = e => {
        setWorkout({
            ...workout,
            [e.target.name]: e.target.value
        })
    }

    const handleLiftChange = e => {
        const liftId = parseInt(e.target.value);
        const isChecked = e.target.checked;
    
        if (isChecked) {
          setSelectedLifts([...selectedLifts, liftId]);
        } else {
          setSelectedLifts(selectedLifts.filter(id => id !== liftId));
        }
      }
  
  return (
    <>
      <Form onSubmit={ handleSubmit }>
      <Form.Group style={{ padding: '10px' }}>
      <h2>Add New Workout</h2>
            <Form.Label>Workout Name:</Form.Label>
                <Form.Control
                    required
                    id="name"
                    type="text"
                    name= "name"
                    value={ workout.name } 
                    onChange={ handleChange }
            />
  
            <Form.Label>Day of the Week:</Form.Label>
                <Form.Control
                    required
                    id="day_of_the_week"
                    type="text"
                    name="day_of_the_week"
                    value={ workout.day_of_the_week } 
                    onChange={ handleChange }
                    style={{ marginBottom: '10px' }}
            />

            <Form.Label>Select Lifts:</Form.Label>
                {allLifts.map(lift => (
                    <Form.Check 
                    key={lift.id}
                    type="checkbox"
                    label={lift.name}
                    value={lift.id}
                    checked={selectedLifts.includes(lift.id)}
                    onChange={handleLiftChange}
                    />
                ))} 
  
        <Button type="submit" variant="light" style={{ marginTop: '10px' }}>Save</Button>
        </Form.Group>
    </Form>
    </>
  )
}

export default WorkoutsAdd