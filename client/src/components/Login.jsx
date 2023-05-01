import React, { useContext, useState } from 'react'
import { UserContext } from "../context/user";
import { useNavigate } from 'react-router-dom'
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [showLoginForm, setShowLoginForm] = useState("true");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailAddress, setEmailAddress] = useState("")
  const [loginErrors, setLoginErrors] = useState([]);
  const [signupErrors, setSignupErrors] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email_address: "",
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
            console.log("session submit")
            setUser(user);
            navigate ('/');
          })
      } 
      else {
          resp.json().then(error => {
            console.log(error)
            setLoginErrors(error.error);
          });
      }
     })
  }

  const handleSignupSubmit = e => {
    e.preventDefault();
    fetch('/user/create', {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    }).then ((resp) => {
      if (resp.ok) {
          resp.json().then(newUser => { 
            console.log("signup submit")
            setUser(newUser);
            handleSessionSubmit(e);
          })
        }
      else {
          resp.json().then((error) => {
            console.log(error)
            setSignupErrors(error.error);
        });
      }
    })
  }


  return (
    <div>
            {/* try to use users now that I'm using context instead of showloginform */}
            {showLoginForm ? (
            <LoginForm setShowLoginForm={ setShowLoginForm } setUsername={ setUsername } setPassword= { setPassword } loginErrors= { loginErrors } handleSessionSubmit= { handleSessionSubmit } username={ username } password= { password }/>
            ) : (
            <SignupForm setShowLoginForm={ setShowLoginForm } handleSignupSubmit={ handleSignupSubmit } signupErrors= { signupErrors } setNewUser= { setNewUser } newUser= { newUser } setUsername= { setUsername } setPassword= { setPassword } setEmailAddress= { setEmailAddress } />
            )
            }
    </div>
  )
}

export default Login