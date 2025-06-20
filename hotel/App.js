
import 'bootstrap/dist/css/bootstrap.min.css';
import Addroom from './Components/Addroom';
import Rooms from './Components/Rooms';

import Hotelfront from './Components/Hotelfront';
import RoomBooking from './Components/RoomBooking';
import BookingDetails from './Components/BookingDetails';
import Login from './Components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Booking from './Components/Booking';
import Footer from './Components/Footer';
import Updateroom from './Components/Updateroom'

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Hotelfront/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/addroom' element={<Addroom/>}></Route>
      <Route path='/rooms' element={<Booking/>}></Route>
      <Route path="/booking" element={<RoomBooking/>}></Route>
      <Route path='/details' element={<BookingDetails/>}></Route>
      <Route path='/list' element={<Rooms/>}></Route>
      
      
    </Routes>   
     <Footer/>
   </BrowserRouter>
  
  );
}

export default App;
