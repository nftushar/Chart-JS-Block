import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, ArcElement, Tooltip, Legend } from 'chart.js';



ChartJS.register(ArcElement, Tooltip, Legend, RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend);

const BarChart = ({ attributes }) => {
  // console.log(attributes.barChart);  
  const { jsonData, chart, csvData, xmlData } = attributes;
  const { border } = chart;
  const { color, width, radius } = border;


  // console.log(border);

  let labels, values;

  if (
    Array.isArray(jsonData) && jsonData.length > 0 && jsonData.every((data) => data && data.label && data.value)
  ) {
    labels = jsonData.map((data) => data.label);
    values = jsonData.map((data) => data.value);
  } else if (
    Array.isArray(xmlData) && xmlData.length > 0 && xmlData.every((data) => data && data.label && data.value)
  ) {
    labels = xmlData.map((data) => data.label);
    values = xmlData.map((data) => data.value);
  } else if (
    Array.isArray(csvData) && csvData.length > 0 && csvData.every((data) => data && data.label && data.value)
  ) {
    labels = csvData.map((data) => data.label);
    values = csvData.map((data) => (data.value ? data.value.replace(/\r/g, '').trim() : ''));
  } else {
    console.error('Unsupported data type or empty/invalid JSON data.');
    console.log('jsonData error:', jsonData);
    console.log('xmlData error:', xmlData);
    console.log('csvData error:', csvData);
    return null;
  }

  const doughnutData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green'],
    datasets: [
      {
        data: values,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
        ],

        borderWidth: width,
        borderRadius: radius,

      },
    ],
  };

  return (
    <div className="bBlocksBarChart">
      <div className="dataCard revenueCard">
        <Doughnut data={doughnutData} />
      </div>
    </div>
  );
};

export default BarChart;