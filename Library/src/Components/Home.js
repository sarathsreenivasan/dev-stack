
import { useEffect, useState } from 'react'
import {  Table,Container, Button } from 'react-bootstrap'
import './homestyle.css'
import axios from 'axios';
import { Link } from 'react-router-dom';



const Home = () => {
const [books,setBooks]=useState([]);
useEffect(()=>{
    axios.get('http://localhost:9000/books')
    .then(res=>setBooks(res.data))
    .catch(err=>console.log(err))
},[])
const handleDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this book?")) {
    axios.delete(`http://localhost:9000/delete/${id}`)
      .then(res => {
        setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
      })
      .catch(err => {
        console.log(err);
        alert("Error deleting book");
      });
  }
};


  return (
    <div className='body'>
      <Container className='pt-5'>
        <div className='d-flex span-12 justify-content-center'>
          <h1  >Library management</h1>
        </div>
       <div className='d-flex justify-content-end'>
                <Link to="/AddBook" className='btn btn-success'>Add New Book</Link>
        </div>
        <br></br>
        <Table className='table table-bordered '>
            <thead>
              <tr>
                <th>Book Name</th>
                <th>Auther Name</th>
                <th>Discription</th>
                <th>price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                books.map((mybook)=>{
                    return(
                        <tr key={mybook.id}>
                            <td>{mybook.book_name}</td>
                            <td>{mybook.author}</td>
                            <td>{mybook.discription}</td>
                            <td>{mybook.price}</td>
                            <td className='justify-content-between'>
                                
                                  <Link to={`/update/${mybook.id}`} className='btn btn-primary'>Edit</Link>
                                
                                
                                <Button variant="danger"  onClick={() => handleDelete(mybook.id)}>
                                  Delete
                                  </Button>
                            </td>
                          
                        </tr>
                    )
                })
              }
            </tbody>
        </Table>
        <div className='d-flex justify-content-end'>

                <Link to="/adduser" className='btn btn-success'>Add New user</Link>
        </div>
        </Container>
    </div>
  )
}

export default Home