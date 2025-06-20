import { Box, Paper } from '@mui/material';
import React, { useState } from 'react';
import { Container, Form, Col, Row, Button } from 'react-bootstrap';
import Usernavbar from './Usernavbar';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const name = "libert";
  const pass = "libert123";

  const handleClick = (e) => {
    e.preventDefault(); // prevent default form submit behavior
    if (username === name && password === pass) {
      navigate('/addroom');
    } else {
      window.alert("Incorrect username or password");
    }
  };

  return (
    <div>
      <Usernavbar />
      <Container className='py-5'>
        <Box maxWidth="600px" margin="auto" className="p-5">
          <Paper elevation={3} sx={{ p: 4 }}>
            <Form className='p-3' onSubmit={handleClick}>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                  Username
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    placeholder="Enter Your Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                  Password
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="password"
                    placeholder="Enter your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 2 }}>
                  <Form.Check label="Remember me" />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 2 }}>
                  <Button type="submit">Sign in</Button>
                </Col>
              </Form.Group>
            </Form>
          </Paper>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
