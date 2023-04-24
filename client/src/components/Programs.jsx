import React, { useContext } from 'react'
import { UserContext } from "../context/user";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ProgramsCard from './ProgramsCard';


const Programs = ({ allPrograms }) => {
  const { user } = useContext(UserContext);
  console.log("program", user)

  return (
    <Form>
        <Form.Group>
        <ul>
          { user ? (
            <>
              <Button type="submit" variant="outline-primary" href="/addprogram" style={{ marginTop: '20px', marginBottom: '10px', marginLeft: '30px' }}>
                Add New Program
              </Button>
              {allPrograms.map(program => 
                <ProgramsCard key={ program.id } program={ program } />
              )}
            </>
          ) : (
            <Form.Label>Please log in to add a new program. </Form.Label>
          )}
        </ul>
        </Form.Group>
    </Form>
  )
}

export default Programs