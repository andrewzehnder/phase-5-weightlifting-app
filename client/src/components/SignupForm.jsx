import React from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const SignupForm = ({ setShowLoginForm, handleSignupSubmit, signupErrors, setNewUser, newUser, setUsername, setPassword, setEmailAddress }) => {
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
   else if (e.target.name === 'email_address') {
    setEmailAddress(e.target.value);
  }
  }
 
  const handleLogin = e => {
   setShowLoginForm("true");
   navigate ('/login');
 }

  return (
    <>

    {signupErrors.length ?
      <Alert severity="error" key={signupErrors}>{signupErrors}</Alert>
      : null
    }

    <Form onSubmit={ handleSignupSubmit }>
        <Form.Group style={{ padding: '10px' }}>
        <h2>Create a New User</h2>
            <Form.Label>Name:</Form.Label>
                <Form.Control
                    required
                    id="name"
                    type="text"
                    name="name"
                    value={ newUser.name } 
                    onChange={ handleChange }
                />

              <Form.Label>Email Address:</Form.Label>
                <Form.Control
                    required
                    id="email_address"
                    type="text"
                    name="email_address"
                    value={ newUser.email_address } 
                    onChange={ handleChange }
                />
  
            <Form.Label>Username:</Form.Label>
                <Form.Control
                    required
                    id="username"
                    type="text"
                    name="username"
                    value={ newUser.username } 
                    onChange={ handleChange }
                />
      
            <Form.Label>Password:</Form.Label>
                <Form.Control
                    required
                    id="password"
                    type="password"
                    name="password"
                    value={ newUser.password } 
                    onChange={ handleChange }
                />
      
            <Form.Label>Password Confirmation:</Form.Label>
                <Form.Control
                    required
                    id="password_confirmation"
                    type="password"
                    name="password_confirmation"
                    value={ newUser.password_confirmation } 
                    onChange={ handleChange }
                    style={{ marginBottom: '10px' }}
                />

       <Button type="submit" variant="light" style={{ marginBottom: '20px' }} >Create</Button>

    </Form.Group>
   </Form>

   <h4>Already have an account? Login here</h4>

        <Button type="submit" variant="light" onClick={ handleLogin }>Login</Button>
        
   </>
  )}

export default SignupForm