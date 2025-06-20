import React from 'react'
import { Container,Navbar,Nav,Button } from 'react-bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

const Usernavbar = () => {
  return (
    <div>
        <Navbar expand="lg" bg="dark" data-bs-theme="dark">
                <Container>
                  <Navbar.Brand href="#home">Hotel-Libert</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                      <Link className='nav-link ' to="/rooms">Rooms</Link>
                      
                      <Link className='nav-link' to="bookings">Contact</Link>
                      <Button variant="outline-danger" className="ms-3">
                        <Link to="/login" className='nav-link ' >
                         Admin
                        </Link>
                      </Button>
                    </Nav>
                  </Navbar.Collapse>
                </Container>
              </Navbar>
    </div>
  )
}

export default Usernavbar