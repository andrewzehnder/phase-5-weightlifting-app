import React from 'react'
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const LoginForm = ({ setShowLoginForm, setUsername, setPassword, loginErrors, handleSessionSubmit, username, password }) => {
  const navigate = useNavigate(0);

  const handleSignUp = e => {
    setShowLoginForm(false);
    navigate ('/login');
  }

  return (
    <>

    {loginErrors.length ?
      <Alert severity="error" key={loginErrors}>{loginErrors}</Alert>
      : null
    }

    <Form onSubmit={ handleSessionSubmit }>
       <Form.Group style={{ padding: '10px' }}>
       <h2>Login with an Existing Account</h2>
            <Form.Label>Username:</Form.Label>
                <Form.Control
                    required
                    id="username"
                    type="text"
                    name="username"
                    value={ username } 
                    onChange={(e) => setUsername(e.target.value)}
                />
  
            <Form.Label>Password:</Form.Label>
                <Form.Control
                    required
                    id="password"
                    type="password"
                    name="password"
                    value={ password } 
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ marginBottom: '10px' }}
                />

       <Button type="submit" variant="light" style={{ marginBottom: '20px' }} >Login</Button>

        </Form.Group>
    </Form>

    <h4>Don't have an account? Sign up here</h4>
        
        <Button type="submit" variant="light" onClick={ handleSignUp }>Signup</Button>
    </>
  )}

export default LoginForm