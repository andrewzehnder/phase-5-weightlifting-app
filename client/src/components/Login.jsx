import React, { useContext, useState } from 'react'
import { UserContext, UserProvider } from "../context/user";
import { useNavigate } from 'react-router-dom'
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const [showLoginForm, setShowLoginForm] = useState("true");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrors, setLoginErrors] = useState([]);
  const [signupErrors, setSignupErrors] = useState([]);

  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    password: "",
    password_confirmation: ""
  })
  

  const navigate = useNavigate(0);

  const handleSessionSubmit = e => {
     e.preventDefault();
     fetch('/login', {
         method: "POST",
         headers: {
             "Accept": "application/json",
             "Content-Type": "application/json"
         },
         body: JSON.stringify({ username, password }),
     }).then ((resp) => {
      if (resp.ok) {
          resp.json().then(user => {
            setUser(user);
            navigate ('/');
          })
      } 
      else {
          resp.json().then(error => {
            setLoginErrors(error.error);
          });
      }
     })
  }

  const handleSignupSubmit = e => {
    e.preventDefault();
    fetch('/signup', {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    }).then ((resp) => {
      if (resp.ok) {
          resp.json().then(newUser => { 
            setUser(newUser);
            handleSessionSubmit(e);
          })
        }
      else {
          resp.json().then((error) => setSignupErrors(error.errors));
      }
    })
  }

  return (
    <div>
        <UserProvider>
            {showLoginForm ? (
            <LoginForm setShowLoginForm={ setShowLoginForm } setUsername={ setUsername } setPassword= { setPassword } loginErrors= { loginErrors } handleSessionSubmit= { handleSessionSubmit } username={ username } password= { password }/>
            ) : (
            <SignupForm setShowLoginForm={ setShowLoginForm } handleSignupSubmit={ handleSignupSubmit } signupErrors= { signupErrors } setNewUser= { setNewUser } newUser= { newUser } setUsername= { setUsername } setPassword= { setPassword } />
            )
            }
        </UserProvider>
    </div>
  )
}

export default Login