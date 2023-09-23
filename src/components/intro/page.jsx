/* eslint-disable no-unused-vars */
import * as chartjs from 'chart.js';
import { Line } from "react-chartjs-2";
import { parseISO, format } from 'date-fns';

import styles from "./page.module.css"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from 'react';
import { DATA_RECORDS } from '../../data/record';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);


const IntroPage = () => {

  const [records,setRecords] = useState([])

  const collectData = async () => {
    const response = await fetch('http://localhost:8080/collect')
    const data = await response.json()
    setRecords(data)
  }

  useEffect(() => {
      collectData()
  },[])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Analytics",
      },
    },
  };

  let yLabel = [];

  let xLabel = [];

  for (let i = 0; i < records.length; i++) {
    let date = parseISO(records[i].createdAt.$date)
    xLabel.push(format(date, "MMMM dd, yyyy"));
   
    yLabel.push(records[i].total_kwh);
  }

//   console.log(yLabel,'is the y label')
//   console.log(xLabel,'is the x label')

  const data = {
    labels: xLabel,
    datasets: [
      {
        label: 'Logs',
        data: yLabel,
        backgroundColor: ["#a6a1e3"],
        borderWidth: 1,
        borderColor:'black'
      }
    ]
  }


  return (
    <div className={styles.container} >
             <Line options={options}  data={data}> </Line>
    </div>
  )
}

export default IntroPage