import axios from 'axios';
import {React,useEffect,useState} from 'react'
import { Container, Table } from 'react-bootstrap';



const List = () => {
    const [books,setBooks]=useState([]);
useEffect(()=>{
    axios.get('http://localhost:9000/books')
    .then(res=>setBooks(res.data))
    .catch(err=>console.log(err))
},[])
  return (
    <div className='body'>
      <Container className='pt-5'>
        <div className='d-flex span-12 justify-content-center'>
          <h1  >Books In Library</h1>
        </div>
       
        <br></br>
        <Table className='table table-bordered '>
            <thead>
              <tr>
                <th>Book Name</th>
                <th>Auther Name</th>
                <th>Discription</th>
                <th>price</th>
                
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
                            
                          
                        </tr>
                    )
                })
              }
            </tbody>
        </Table>
        
        </Container>
    </div>
  )
}

export default List