import React, { useContext } from 'react'
import { UserContext } from "../context/user";
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const SignupForm = ({ setShowLoginForm, handleSignupSubmit, signupErrors, setNewUser, newUser, setUsername, setPassword }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate(0);

  const handleChange = e => {
    setNewUser({
        ...newUser,
        [e.target.name]: e.target.value
    })
   if (e.target.name === 'username') {
     setUsername(e.target.value);
   } 
   else if (e.target.name === 'password') {
     setPassword(e.target.value);
   }
  }
 
  const handleLogin = e => {
   setShowLoginForm("true");
   navigate ('/login');
 }

  return (
    <div>

    {signupErrors.length ?
      <Alert severity="error" key={signupErrors}>{signupErrors}</Alert>
      : null
    }

    <Form>
        <Form.Group style={{ width: '33.33%', padding: '10px' }}>
        <h2>Create a New User</h2>
        <div>
            <Form.Label>Name:</Form.Label>
                <Form.Control
                    required
                    id="name"
                    type="text"
                    value={ newUser.name } 
                    onChange={ handleChange }
                />
       </div>

       <div>
            <Form.Label>Username:</Form.Label>
                <Form.Control
                    required
                    id="username"
                    type="text"
                    value={ newUser.username } 
                    onChange={ handleChange }
                />
       </div>

       <div>
            <Form.Label>Password:</Form.Label>
                <Form.Control
                    required
                    id="password"
                    type="password"
                    value={ newUser.password } 
                    onChange={ handleChange }
                />
       </div>

       <div>
            <Form.Label>Password Confirmation:</Form.Label>
                <Form.Control
                    required
                    id="password_confirmation"
                    type="password"
                    value={ newUser.password_confirmation } 
                    onChange={ handleChange }
                    style={{ marginBottom: '10px' }}
                />
       </div>

       <Button input type="submit" variant="light" onClick={ handleSignupSubmit } style={{ marginBottom: '20px' }} >Create</Button>

        <h4>Already have an account? Login here</h4>
        <div>
        <Button type="submit" variant="light" onClick={ handleLogin }>Login</Button>
        </div>

    </Form.Group>
   </Form>
   </div>
  )}

export default SignupForm