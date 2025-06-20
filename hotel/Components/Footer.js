import React from 'react'
import {Nav,NavLink,Row, Col } from 'react-bootstrap'
const Footer = () => {
  return (
    <div>
        <footer className='bg-dark text-light p-5'>
            
                <Nav className='d-flex span-12 justify-content-center mt-5 '>
                <Row>
                 <Col > 
                        
                        
                <NavLink className='text-light'>16501 Collins Ave, Sunny Isles Beach, FL 33160, United States</NavLink> 
                 <NavLink className='text-light'>librt@hotel.com</NavLink>
                 <NavLink className='text-light'>010-020-0340</NavLink>
                 </Col>         
                    
                
                
                
                <Col>
                    <h4>Help &amp; Information</h4>
                    
                        <NavLink className='text-light'>Help</NavLink>
                        <NavLink className='text-light'>FAQ's</NavLink>
                        
                    
                </Col>
                </Row>
                </Nav>
                <Col className='d-flex span-12 justify-content-center mt-5'>
                    <div >
                        <p>Copyright ©  All Rights Reserved. </p>
                        
                        
                        <Nav>
                             <NavLink className='text-light'><i class="bi bi-envelope"></i></NavLink>
                            <NavLink className='text-light'><i class="bi bi-instagram"></i></NavLink>
                            <NavLink className='text-light'><i class="bi bi-whatsapp"></i></NavLink>
                            <NavLink className='text-light'><i class="bi bi-twitter-x"></i></NavLink>
                        </Nav>
                    </div>
                </Col>
            
            
           </footer>
    </div>
  )
}

export default Footer