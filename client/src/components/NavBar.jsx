import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { UserContext } from "../context/user";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate(0);

  function handleLogout() {
    fetch("/logout", { 
      method: "DELETE" 
    }).then((resp) => {
      if (resp.ok) {
        navigate ('/login');
        setUser(null);
      }
    });
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Weightlifting App</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link href="/programs">My Programs</Nav.Link>
          <Nav.Link href="/workouts">Workouts</Nav.Link>
          <Nav.Link href="/lifts">Lifts</Nav.Link>
          </Nav>
          <Nav>
            { user ? 
                <Button variant="outline-light" onClick={handleLogout} >Logout</Button> : 
                <Button variant="outline-light" href="/login">Login</Button>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar