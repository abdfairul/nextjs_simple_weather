import react, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Container from 'react-bootstrap/Container'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ChartComponent(props:any) {
  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const createLineChart = () => {
    const date: any[] = [];
    const temperature: any[] = [];

    props.data?.map((v:any) => {
      date.push(v?.date);
      temperature.push(v?.temperature);
    });

    const data = {
      labels: date,
      datasets: [
        {
          label: 'Temperature',
          data: temperature,
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
        },
      ],
    };

    return <Line data={data} options={options} />
  }

  return (
  <Container className="p-3">
    {createLineChart()}
  </Container>
  );
}
