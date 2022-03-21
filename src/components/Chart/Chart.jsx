import React ,{useState,useEffect} from 'react';

import { Line,Bar } from 'react-chartjs-2';
import {fetchDailyData} from '../../api';
import styles from './Chart.module.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  } from 'chart.js';
  
  ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
  );


const Chart1 = ({data:{ confirmed,recovered,deaths }, country}) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const initialDailydata = await fetchDailyData();
     setDailyData(initialDailydata);
    }
    fetchAPI();
    
  },[]);

  const barChart = (
    confirmed 
    ? (
      <Bar 
      data = {{
        labels: ['Active', 'Recovered', 'Deaths'],
        datasets: [{
          label: 'People',
          backgroundColor: [
            'rgba(0,0,255,0.5)',
            'rgba(0, 255, 0, 0.5)',
            'rgba(255, 0, 0 , 0.5)'
          ],
          data: [confirmed.value ,recovered.value ,deaths.value ]
        }]
      }}
      options= {{
        legend:{display:false},
        title: {display:true, text:`Current state in ${country}`},
      }}/>
      ) : null
      
  );

  const lineChart = (
    dailyData.length
    ? (
    <Line
    data={{
      labels:dailyData.map(({ date }) => date),
      datasets:[{
        data:dailyData.map(({ confirmed }) => confirmed),
        label: 'Active',
        borderColor:"#3333ff",
        fill:true,
      },{
        data:dailyData.map(({ deaths }) => deaths),
        label:'Deaths',
        borderColor:"red",
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        fill:true,
      }, 
    ]
    }}
    />) :null
  );

  return (
    <div className={styles.container}>
    {country ? barChart : lineChart}
    </div>
  )
}



export default Chart1;
