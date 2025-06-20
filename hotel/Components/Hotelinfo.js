import React from 'react'
import {Carousel, Container}  from 'react-bootstrap';
import './Style.css'
import hotel1 from './image/hotel 1.jpg';

const Hotelinfo = () => {
  return (
    <Container className="my-4">
      <div className="text-center mb-4">
        <h1>HOTEL LIBERT</h1>
      </div>

      <Carousel fade interval={3000} pause="hover"> {/* autoplay with fade */}
        <Carousel.Item>
          <img className="carousel-img" src={hotel1} alt="Hotel 1" />
        </Carousel.Item>
      </Carousel>

      <div className="mt-4">
        <div className="text-center mb-4">
            <h3>Hotel Libert Where Comfort Meets Elegance</h3>
        </div>
        <p>
          
Welcome to Hotel Libert, your perfect escape nestled in the heart of the city. Blending timeless elegance with modern luxury, Hotel Libert offers an exceptional stay experience for both business and leisure travelers. With our well-appointed rooms, world-class amenities, and warm hospitality, we ensure that every moment you spend with us is memorable. Whether you're here for a relaxing retreat or a productive trip, Hotel Libert promises a stay defined by comfort, style, and personalized service.
        </p>
      </div>
    </Container>
    
  );
}

export default Hotelinfo