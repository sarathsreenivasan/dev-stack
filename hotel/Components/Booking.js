import { useEffect , useState} from 'react';
import { Card, Container, Row, Col , Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Usernavbar from './Usernavbar';

const Booking = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9000/roomlist')
      .then(res => setRooms(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <Usernavbar/>
    <Container className="my-4">
      <h1 className="bg-dark text-white text-center py-2 mb-4">All Rooms</h1>
      <Row>
        {rooms.map((room) => (
          <Col key={room.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="shadow text-center h-100">
              <Card.Img
                variant="top"
                style={{ height: '200px', objectFit: 'cover' }}
                src={`http://localhost:9000/roomimage/${room.id}`}
                alt={room.roomname}
              />
              <Card.Body>
                
                <Card.Title>{room.roomname}</Card.Title>
                <Card.Text>Room Number: {room.roomno}</Card.Text>
                <Card.Text>Type: {room.type}</Card.Text>
                <Card.Text>Price: ₹{room.price}</Card.Text>
                <Card.Text>Size / Capacity: {room.size} / {room.capacity}</Card.Text>
                <Button variant='dark'>
                  <Link to='/booking' className='nav-link'>Book Now</Link>
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    </div>
  );
};

export default Booking