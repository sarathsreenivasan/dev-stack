import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import './homestyle.css'



const Addbook = () => {
 
  const [books,setBooks]=useState([{
    book_name:'',
    author:'',
    discription:'',
    price:''

}])
const navigate=useNavigate();
const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post('http://localhost:9000/Addbook',books)
    .then(res=>{
      console.log(res)
      navigate('/home')
    })
    .catch(err=>console.log)
  }
  return (
  <div className=' body'>
   <Container >
    <div className='d-flex span-12 justify-content-center pt-5'>
      <h1>Add Book</h1>
    </div>
   <Form className=' p-5' onSubmit={handleSubmit}>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Book Name
        </Form.Label>
        <Col sm={10}>
          <input type="text" className='form-control' onChange={e=>setBooks({...books,book_name:e.target.value})}  />
        </Col>
      </Form.Group>

       <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={2}>
          Author Name
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text"  onChange={e=>setBooks({...books,author:e.target.value})}/>
        </Col>
      </Form.Group>
           <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
          Discription
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" onChange={e=>setBooks({...books,discription:e.target.value})} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={2}>
          price
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" onChange={e=>setBooks({...books,price:e.target.value})} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit" variant='success'>Add Book</Button>
        </Col>
      </Form.Group>
    </Form>
    </Container>
  </div>
  );
}

export default Addbook