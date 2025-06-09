import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState} from 'react';

const Registration = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
    displayname: '',
    Age: '',
    place: ''
});

  const navigate=useNavigate();
const handleSubmit=(e)=>{
    e.preventDefault()
   axios.post('http://localhost:9000/adduser', user, {
    headers: { 'Content-Type': 'application/json' }
})
      .then(res => console.log(res))
      .catch(err => console.error(err));
      navigate('/home')
  }
  const [roll, setRoll] = useState('');

const handleChange = (e) => {
  setRoll(e.target.value);
};
  return (
  <div className=' body'>
    <Container>
    <div className='d-flex span-12 justify-content-center pt-5'>
      <h1>Registration</h1>
    </div>
     <Form className='mt-3 p-5' onSubmit={handleSubmit}>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalUsername">
        <Form.Label column sm={2}>
          User Name
        </Form.Label>
        <Col sm={10}>
          
          <Form.Control type="text"   onChange={e=>setUser({...user,username:e.target.value})}/>
        </Col>
      </Form.Group>

       <Form.Group as={Row} className="mb-3" controlId="formHorizontalDisplayname">
        <Form.Label column sm={2}>
          Display Name
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text"  onChange={e=>setUser({...user,displayname:e.target.value})}/>
        </Col>
      
       </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalAge">
        <Form.Label column sm={2}>
          Age
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" onChange={e=>setUser({...user,Age:e.target.value})} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalPlace">
        <Form.Label column sm={2}>
          place
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" onChange={e=>setUser({...user,place:e.target.value})} />
        </Col>
      </Form.Group>
      
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={2}>
          Password
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="password" onChange={e=>setUser({...user,password:e.target.value})} />
        </Col>
      </Form.Group>
       <Form.Check
          type="radio"
          label="Admin"
          name="roll"
          value="admin"
          checked={roll === 'admin'}
          onChange={handleChange}
          inline
        />

        <Form.Check
          type="radio"
          label="User"
          name="roll"
          value="user"
          checked={roll === 'user'}
          onChange={handleChange}
          inline
        />
      <p>Selected Role: {roll}</p>
      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit" variant='success'>Add user</Button>
        </Col>
      </Form.Group>
    </Form>
    </Container>
  </div>
  );

}

export default Registration