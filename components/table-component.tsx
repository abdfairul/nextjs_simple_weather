import type { NextPage } from "next";
import React, { useState } from 'react';
import styles from "../styles/Home.module.css";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'

export default function TableComponent(props:any) {

  const createTable = () => {
    let table:any[] = []
    let data = props.data

    if(!data || data.length != 30) {
      return table
    }

    for (let i = 0; i < 30; i++) {
      let children:any[] = []
      children.push(<td>{data[i].date}</td>)
      children.push(<td>{data[i].forecast}</td>)
      children.push(<td>{data[i].humidity}</td>)
      children.push(<td>{data[i].temperature}</td>)
      children.push(<td>{data[i].wind}</td>)
      table.push(<tr key={data[i].key}>{children}</tr>)
    }

    return table
  }


  return (
  <Container className="p-3">
    <Table striped bordered hover>
      <thead>
        <tr>
          <th key="1">Date</th>
          <th key="2">Forecast</th>
          <th key="3">Humidity</th>
          <th key="4">Temperature</th>
          <th key="5">Wind</th>
        </tr>
      </thead>
      <tbody>
        {createTable()}
      </tbody>
    </Table>
  </Container>
  );
}

