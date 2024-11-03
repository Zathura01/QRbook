import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Style.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Screen from './Screen';
import Scan from './Scan';
import bk from './backT.jpeg';

function NewLogin() {
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'Email') {
      setEmail(value);
    } else if (name === 'Password') {
      setPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'gaurd@gmail.com' && password === '1234') {
      setLogin(true);
      localStorage.setItem("keyG", "Admin")
    } else {
      alert('Invalid credentials');
    }
  };

  const handleBack = () => {
    
  } 

  const backgroundStyle = {
    backgroundImage: `url(${bk})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '80vh', // Adjust the height as needed
  };

  return (
    <>
      {
       
          login ? (
            <Scan />
          ) : (
            <div className='Login' style={backgroundStyle}>
              <Form className='Form' onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="Email"
                    value={email}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="Password"
                    value={password}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit form
           </Button>
              </Form> 
            </div>
          )}
    </>
  );
}

export default NewLogin;
