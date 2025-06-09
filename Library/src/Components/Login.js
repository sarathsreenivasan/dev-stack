import { Form, Button } from "react-bootstrap";
import './homestyle.css';
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [userdata, setUserdata] = useState({
    username: "",
    password: ""
  });

  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userdata)
    axios.post('http://localhost:9000/login', userdata)
     .then(res => {
       const { token, Roll } = res.data;
       localStorage.setItem("token", token);
       if (Roll === "admin") {
         navigate("/home");
       } else {
         navigate("/list");
       }
     })

      .catch(err =>{ console.log(err);
      alert("please check the usernsme and password entered correctly")
      })
  };

  const handleChange = (e) => {
    setUserdata({
      ...userdata,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="body">
      <div className='d-flex span-12 justify-content-center'><h1>LIBRARY LOGIN</h1></div>
      <div className="container">
        <Form className='mt-3 p-5' onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              name="username"
              onChange={handleChange}
              value={userdata.username}
              placeholder="Enter user id"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={handleChange}
              value={userdata.password}
              placeholder="Password"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
