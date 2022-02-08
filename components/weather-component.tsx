import type { NextPage } from "next";
import React, { useState, useEffect } from 'react';
import styles from "../styles/Home.module.css";
import TableComponent from "./table-component"
import ChartComponent from "./chart-component"
import DatePickerComponent from "./date-picker-component"
import Container from 'react-bootstrap/Container'
import axios from 'axios';

export default function TableChartComponent() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [tableData, setTableData] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);

  const onDateChange = (e:any) => {
    setDate(e)
  };

  useEffect(() => {
    setTableData([])
    getData()
  }, [date])

  const getData = () => {
    var dateObj = new Date(date); 
    for (let i = 30; i > 0; i--) {
      dateObj.setDate(dateObj.getDate() - 1);
      let dateString = dateObj.toISOString().split('T')[0];
      let api = "https://api.data.gov.sg/v1/environment/24-hour-weather-forecast?date=" + dateString
      axios.get(api)
        .then(res => {
          try {
            let rawData = res.data.items[0].general;

            // make sense of data:
            const timeStamp = dateString;
            const forecast = rawData.forecast;
            const humidityL = rawData.relative_humidity.low;
            const humidityH = rawData.relative_humidity.high;
            const temperatureL = rawData.temperature.low;
            const temperatureH = rawData.temperature.high;
            const windL = rawData.wind.speed.low;
            const windH = rawData.wind.speed.high;
            const windD = rawData.wind.direction;

            var tableItem: { [key: string]: string; }= {
              key: new Date().toISOString(),
              date: timeStamp,
              forecast: forecast,
              humidity: humidityL + "," + humidityH,
              temperature: temperatureL + "," + temperatureH,
              wind: windL + "," + windH + "," + windD
            }

            var chartItem: { [key: string]: string; } = {
              key: new Date().toISOString(),
              date: timeStamp,
              temperature: temperatureH
            }

            setTableData(tableData => [...tableData, tableItem])
            setChartData(chartData => [...chartData, chartItem])
          }
          catch(error:any) {
            console.log(error.message);
            var tableItem: { [key: string]: string; } = {
              key: new Date().toISOString(),
              date: dateString,
              forecast: "NA",
              humidity: "NA",
              temperature: "NA",
              wind: "NA"
            }

            var chartItem: { [key: string]: string; } = {
              key: new Date().toISOString(),
              date: dateString,
              temperature: "0"
            }

            setTableData(tableData => [...tableData, tableItem])
            setChartData(chartData => [...chartData, chartItem])
          }
        })
        .catch(function (error)
        {
           console.log(error.message);
        })
    }
  };

  return (
  <Container className="p-3">
    <DatePickerComponent date={date} onDateChange={onDateChange} />
    <TableComponent data={tableData}/>
    <ChartComponent data={chartData}/>
  </Container>
  );
}

