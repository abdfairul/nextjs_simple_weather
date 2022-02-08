import type { NextPage } from "next";
import React, { useState } from 'react';
import styles from "../styles/Home.module.css";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function DatePickerComponent(props:any) {
  const onDateChange = (e:any) => {
    props.onDateChange(e.target.value);
  };

  return (
  <Container className="p-3">
    {/*<Form.Control type="date" name='date_of_birth' error={errors.date_of_birth} ref={register} />*/}
    <Form.Control type="date" name='date_of_birth' value={props.date} onChange={onDateChange}/>
  </Container>
  );
}

