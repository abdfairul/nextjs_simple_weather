import type { NextPage } from "next";
import React, { useState } from 'react';
import styles from "../styles/Home.module.css";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useRouter } from 'next/router';
import { userService } from '../services';

export default function LoginComponent() {
  const [username, setUsername] = useState("Entah");
  const [password, setPassword] = useState("Entah");

  const router = useRouter();

  const handleSubmit = (e:any) => {
    const form = e.currentTarget;
    e.preventDefault();

    return userService.login(username, password)
      .then(() => {
          router.push('/');
      })
      .catch(error => {
          console.log(error);
      });
  };

  const onChangeUsername = (event:any) => {
    setUsername(event.target.value)
  };

  const onChangePassword = (event:any) => {
    setPassword(event.target.value)
  };

  return (
  <Container className="p-3">
    <Container className="p-5 mb-4 bg-light rounded-3">
      <h1 className="header text-center">
        Welcome
      </h1>
      <Row>
      <Col/>
      <Col xs={5}>    
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username..." 
              onChange={onChangeUsername} value={username}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password..." 
              onChange={onChangePassword} value={password}/>
            <Form.Text className="text-muted">
              Hint: use "ADMIN:ADMIN" to login. :))
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          
        </Form>
      </Col>
      <Col/>
      </Row>

    </Container>
  </Container>
  );
}

