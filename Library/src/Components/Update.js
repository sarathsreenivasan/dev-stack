import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useEffect, useState } from 'react';
import './homestyle.css'

const Update = () => {
    const [books,setBooks]=useState({
    book_name:'',
    author:'',
    discription:'',
    price:''

})
const {id} = useParams()


 useEffect(()=>{
        axios.get('http://localhost:9000/books/'+id)
        .then(res=>{
            setBooks(res.data[0]);
           
           
        })
        .catch(error=>{
            console.log(error);
        });
    },[id]);



const navigate=useNavigate();
const handleSubmit=(e)=>{
    e.preventDefault()
     axios.patch('http://localhost:9000/update', { ...books, id })
    .then(res=>{
      console.log(res)
      navigate('/home')
    })
    .catch(err=>console.log(err))
  }
  
  return (
    <div className=' body'>
   <Container >
    <div className='d-flex span-12 justify-content-center pt-5'>
      <h1>Edit Book Information</h1>
    </div>
  
   <Form className=' p-5' onSubmit={handleSubmit}>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Book Name
        </Form.Label>
        <Col sm={10}>
          <input type="text" className='form-control' value={books.book_name}  onChange={e => setBooks({ ...books, book_name: e.target.value })}/>
        </Col>
      </Form.Group>

       <Form.Group as={Row} className="mb-3" controlId="formHorizontalAuthor">
        <Form.Label column sm={2}>
          Author Name
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text"  onChange={e=>setBooks({...books,author:e.target.value})} value={books.author}/>
        </Col>
      </Form.Group>
           <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
          Discription
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" onChange={e=>setBooks({...books,discription:e.target.value})} value={books.discription}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalPrice">
        <Form.Label column sm={2}>
          price
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" onChange={e=>setBooks({...books,price:e.target.value})} value={books.price}/>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit" variant='success'>Update Book</Button>
        </Col>
      </Form.Group>
    </Form>
    </Container>
  </div>
  );
}

export default Update