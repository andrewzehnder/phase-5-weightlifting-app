import React, { useContext } from 'react'
import { UserContext } from "../context/user";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import LiftsCard from './LiftsCard';

const Lifts = ({ allLifts }) => {
  const { user } = useContext(UserContext);

  return (
    <Form>
        <Form.Group>
            <Button type="submit" variant="outline-primary" href="/addlift" style={{ marginTop: '20px', marginBottom: '10px', marginLeft: '30px' }}>Add New Lift</Button>
            <ul>
                { allLifts.map(lift => 
                <LiftsCard key={ lift.id } lift={ lift } user={ user } />
                )}
            </ul>
        </Form.Group>
    </Form>
  )
}

export default Lifts