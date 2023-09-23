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
import { toast } from 'react-toastify';

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
  const [access,setAccess] = useState(false)
  const [empName, setEmpName] = useState("")

  const collectData = async (empname) => {
  
    if(!empname) return toast.error("No access")
    toast.info("collecting data")
    const response = await fetch('http://localhost:8080/collect', {
      method: 'POST', // Specify the HTTP method
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
      },
      body: JSON.stringify({
        name: empname,
      }), // Convert the data to JSON format
    });
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


  const onClick = () => {
    try{
      if(!empName || empName.length < 2) return toast.error("Enter Employee name")
      collectData(empName)
     setAccess(true)
    }catch(error){
      toast.error(error?.message || "something went wrong")
    }

  }


  return (
    <div className={styles.container} >
        { access && <Line options={options}  data={data}> </Line>}
        {!access && (
          <div className={styles.form} >
            <div className='flex flex-col' >
              <h2 className='p-0 m-0 text-bold text-blue-500'>You do not have access to view this page</h2>
              <p>Request access below</p>
            </div>
            <div>
              <input type="text" placeholder='Employee name' onChange={(e) => setEmpName(e.target.value)} />
              <button onClick={onClick} >Get access</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default IntroPage