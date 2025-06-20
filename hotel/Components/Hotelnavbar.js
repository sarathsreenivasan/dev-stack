import React from 'react'
import { Container,Navbar,Nav, Button  } from 'react-bootstrap'

import { Link } from 'react-router-dom'
const Hotelnavbar = () => {
  return (
    <div><Navbar expand="lg" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Hotel-Admins</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link className='nav-link' to="/list">Rooms</Link>
              <Link className='nav-link' to="/addroom">Add Room</Link>
              
              
              <Link className='nav-link' to="/details">Bookings</Link>
              <Button variant="outline-danger" className="ms-3">
                <Link to="/" className='nav-link' >
                 Log Out
                </Link>
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
    </div>
  )
}

export default Hotelnavbar