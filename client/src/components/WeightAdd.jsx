import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const WeightAdd = ({ lift, user }) => {
    const [lifts, setLifts] = useState([]);
    const [liftInfo, setLiftInfo] = useState([]);
    const [completedSets, setCompletedSets] = useState("");
    const [completedReps, setCompletedReps] = useState("");
    const [completedWeight, setCompletedWeight] = useState("");
    const [completedORM, setCompletedORM] = useState("");
    
    useEffect(() => {
        const liftInfoFirst = lifts ? lifts[0] : null;
        const newLiftInfo = liftInfoFirst ? liftInfoFirst : (lifts ? [] : null);
        setLiftInfo(newLiftInfo);
    }, [lifts]);

    useEffect(() => {
        fetch(`/weight/${lift.id}`)
        .then ((resp) => {
          if (resp.ok) {
              resp.json()
              .then((lift) => setLifts(lift))
          }
        })
    }, []);

    const handleSave = (e) => {
        e.preventDefault();
        fetch(`/calculate_one_rep_max?completed_weight=${completedWeight}&completed_reps=${completedReps}`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            setCompletedORM(data)
        })
    }

    useEffect(() => {
        if (completedORM) {
          const requestData = {
            method: '',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              lift_id: lift.id,
              user_id: user.id,
              one_rep_max: completedORM,
              last_number_of_sets: completedSets,
              last_number_of_reps: completedReps,
              last_number_of_weight: completedWeight
            })
          }
      
          if (liftInfo.id) {
            requestData.method = 'PATCH';
            fetch(`/weight/${liftInfo.id}`, requestData)
              .then(resp => resp.json())
              .then(data => {
                console.log(data);
                setLiftInfo(data);
              });
          } else {
            requestData.method = 'POST';
            fetch('/weight', requestData)
              .then(resp => resp.json())
              .then(data => {
                console.log(data);
                setLiftInfo(data);
              });
          }
        }
      }, [completedORM]);

    return (
    <Card style={{ marginBottom: '10px' }}>
        <Card.Body>
            <div className="row mb-2">
            <div className="col-6">
                <Card.Title>{lift.name}</Card.Title>
            </div>
            <div className="col-6 text-end">
                <Card.Text>One Rep Max: {liftInfo?.one_rep_max}</Card.Text>
            </div>
            </div>
            <div className="row mb-2">
            <div className="col-6">
                <Card.Text>Past Sets</Card.Text>
            </div>
            <div className="col-6">
                <Card.Text>Completed Sets</Card.Text>
            </div>
            </div>
            <div className="row mb-2">
            <div className="col-6">
                <Card.Text>{liftInfo?.last_number_of_sets}</Card.Text>
            </div>
            <div className="col-6">
                <Form.Control type="text" placeholder="Enter completed sets" value={completedSets} onChange={(e) => setCompletedSets(e.target.value)} />
            </div>
            </div>
            <div className="row mb-2">
            <div className="col-6">
                <Card.Text>Past Reps</Card.Text>
            </div>
            <div className="col-6">
                <Card.Text>Completed Reps</Card.Text>
            </div>
            </div>
            <div className="row mb-2">
            <div className="col-6">
                <Card.Text>{liftInfo?.last_number_of_reps}</Card.Text>
            </div>
            <div className="col-6">
                <Form.Control type="text" placeholder="Enter completed reps" value={completedReps} onChange={(e) => setCompletedReps(e.target.value)} />
            </div>
            </div>
            <div className="row mb-2">
            <div className="col-6">
                <Card.Text>Past Weight</Card.Text>
            </div>
            <div className="col-6">
                <Card.Text>Completed Weight</Card.Text>
            </div>
            </div>
            <div className="row mb-2">
            <div className="col-6">
                <Card.Text>{liftInfo?.last_number_of_weight}</Card.Text>
            </div>
            <div className="col-6">
                <Form.Control type="text" placeholder="Enter completed weight" value={completedWeight} onChange={(e) => setCompletedWeight(e.target.value)} />
            </div>
            </div>
            <Button variant="primary" onClick={ handleSave }>Submit</Button>
        </Card.Body>
    </Card>

  )
}

export default WeightAdd