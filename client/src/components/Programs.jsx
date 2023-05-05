import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from "../context/user";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ProgramsCard from './ProgramsCard';


const Programs = ({ allPrograms, handleDeleteProgram }) => {
  const { user } = useContext(UserContext);
  const [userPrograms, setUserPrograms] = useState([])

  useEffect(() => {
    fetch("/user_programs")
    .then ((resp) => {
      if (resp.ok) {
          resp.json().then((programs) => setUserPrograms(programs))
      }
  })}, []);

  return (
    <Form>
        <Form.Group>
        <ul>
          { user ? (
            <>
              { userPrograms.length ? (
                <>
                  <Button type="submit" variant="outline-primary" href="/addprogram" style={{ marginTop: '20px', marginBottom: '10px' }}>Add New Program</Button>
                  {userPrograms.map(program => 
                    <ProgramsCard key={ program.id } program={ program } handleDeleteProgram={ handleDeleteProgram } />
                  )}
                </>
              ) : (
                <>
                  <Button type="submit" variant="outline-primary" href="/addprogram" style={{ marginTop: '20px', marginBottom: '10px' }}>Add New Program</Button>
                  <br /><Form.Label>No Programs Available</Form.Label>
                </>
              )}
            </>
          ) : (
            <Form.Label style={{ marginTop: '10px'}}>Please log in to add/view programs</Form.Label>
          )}
        </ul>
        </Form.Group>
    </Form>
  )
}

export default Programs