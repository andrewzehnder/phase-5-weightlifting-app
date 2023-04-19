import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from "../context/user";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ProgramsCard from './ProgramsCard';


const Programs = () => {
  const { user } = useContext(UserContext);
  const [programsList, setProgramsList] = useState([]);

  useEffect(() => {
    fetch("/programs_all")
    .then((resp) => resp.json())
    .then((programs) => {
        setProgramsList(programs);
    })
}, []);

  return (
    <Form>
        <Form.Group>
            <Button type="submit" variant="outline-primary" href="/addprogram" style={{ marginTop: '20px', marginBottom: '10px', marginLeft: '30px' }}>Add New Program</Button>
            <ul>
                { programsList.map(program => 
                <ProgramsCard key={ program.id } program={ program } user={ user } />
                )}
            </ul>
        </Form.Group>
    </Form>
  )
}

export default Programs