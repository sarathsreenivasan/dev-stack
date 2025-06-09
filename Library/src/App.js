
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Addbook from './Components/Addbook';
import Registration from './Components/Registration';
import Update from './Components/Update';
import Login from './Components/Login';
import List from './Components/List';


function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/Addbook' element={<Addbook/>}></Route>
      <Route path='/adduser' element={<Registration/>}></Route>
      <Route path="/update/:id" element={<Update/>}></Route>
      <Route path='/list' element={<List/>}></Route>
      
    </Routes>   
   </BrowserRouter>
  );
}

export default App;
