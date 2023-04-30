import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ProgramsEdit = ({ allWorkouts, handleEditProgram }) => {
    const [program, setProgram] = useState({})
    const [selectedWorkouts, setSelectedWorkouts] = useState([]);
    const navigate = useNavigate(0);
    const { id }  = useParams();
    
    useEffect(() => {
        fetch(`/program/${id}`)
          .then(resp => {
            if (resp.ok) {
              resp.json().then(program => {
                setProgram(program);
                const workoutIds = program.programs_workouts.map(pw => pw.workout.id);
                setSelectedWorkouts(workoutIds);
              })}
          })
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        fetch(`/program/${id}`, {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ program,
             workouts: selectedWorkouts})
        })
        .then(resp => resp.json())
        .then(data => {
            handleEditProgram(data)
            navigate(`/programs`);
        }) 
     }
    
    const handleChange = e => {
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
          setSelectedWorkouts(selectedWorkouts.filter(id => id !== workoutId));
        }
      }
    
    return (
    <>
      <Form onSubmit={ handleSubmit }>
      <Form.Group style={{ padding: '10px' }}>
      <h2>Edit Program</h2>
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

export default ProgramsEdit