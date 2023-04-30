import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ProgramsAdd = ({ handleAddProgram, allWorkouts }) => {
  const [program, setProgram] = useState({
    name: ""
})
const [selectedWorkouts, setSelectedWorkouts] = useState([]);
const navigate = useNavigate(0);

const handleSubmit = e => {
   e.preventDefault();
   fetch('/programs', {
       method: "POST",
       headers: {
           "Accept": "application/json",
           "Content-Type": "application/json"
       },
       body: JSON.stringify({ program,
        workouts: selectedWorkouts})
   })
   .then(resp => resp.json())
   .then(data => {
       handleAddProgram(data)
       navigate(`/programs`);
   }) 
}

const handleChange = e => {
  console.log(e, e.target.name, e.target.value, program)
    setProgram({
        ...program,
        [e.target.name]: e.target.value
    })
}

const handleWorkoutChange = e => {
    const workoutId = parseInt(e.target.value);
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedWorkouts([...selectedWorkouts, workoutId]);
    } else {
      selectedWorkouts(selectedWorkouts.filter(id => id !== workoutId));
    }
  }

return (
<>
  <Form onSubmit={ handleSubmit }>
  <Form.Group style={{ padding: '10px' }}>
  <h2>Add New Program</h2>
        <Form.Label>Program Name:</Form.Label>
            <Form.Control
                required
                id="name"
                type="text"
                name= "name"
                value={ program.name } 
                onChange={ handleChange }
        />

        <Form.Label>Select Workouts:</Form.Label>
            {allWorkouts.map(workout => (
                <Form.Check 
                key={workout.id}
                type="checkbox"
                label={workout.name}
                value={workout.id}
                checked={selectedWorkouts.includes(workout.id)}
                onChange={ handleWorkoutChange }
                />
            ))} 

    <Button type="submit" variant="light" style={{ marginTop: '10px' }}>Save</Button>
    </Form.Group>
</Form>
</>
)
}

export default ProgramsAdd