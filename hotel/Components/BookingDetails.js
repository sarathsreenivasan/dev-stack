import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import Hotelnavbar from './Hotelnavbar';

const BookingDetails = () => {
  const [detail, setDetail] = useState([]); // ✅ must be array
  const [time, setTime] = useState('');
  const [outtime, setOuttime] = useState('');

  useEffect(() => {
    axios.get('http://localhost:9000/showdetails')
      .then(res => setDetail(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleClick = (id) => {
    axios.get(`http://localhost:9000/details/${id}`)
      .then(res => {
        const date = new Date(res.data.time)
        setTime(date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
        console.log('Received time:', date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
      })
      .catch(err => {
        console.log(err, 'operation failed');
      });
  };
  const handleClik = (id) => {
    axios.get(`http://localhost:9000/details/${id}`)
      .then(res => {
       const date = new Date(res.data.time)
        setOuttime(date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
        console.log('Received time:', res.data.time);
      })
      .catch(err => {
        console.log(err, 'operation failed');
      });
  };

  return (
    <div>
      <Hotelnavbar/>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Room Number</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>ID Proof</th>
            <th>Proof Number</th>
            <th>Date</th>
            <th>Check in</th>
            <th>Check out</th>
          </tr>
        </thead>
        <tbody>
          {
            Array.isArray(detail) && detail.map((details) => (
              <tr key={details.id}>
                <td>{details.roomno}</td>
                <td>{details.firstname}</td>
                <td>{details.lastname}</td>
                <td>{details.age}</td>
                <td>{details.gender}</td>
                <td>{details.proof}</td>
                <td>{details.proofno}</td>
                <td>{details.date}</td>
                <td>
                  <Button onClick={() => handleClick(details.id)}>Check</Button>
                  {time && <p>Check-in Time: {time}</p>}
                </td>
                <td>
                  <Button variant='warning' onClick={() => handleClik(details.id)}>Check</Button>
                  {time && <p>Check-out Time: {outtime}</p>}
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  );
};

export default BookingDetails;
