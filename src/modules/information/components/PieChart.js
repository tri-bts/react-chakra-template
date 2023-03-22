/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  plugins: {
    title: {
      display: true,
      text: 'Persentase Populasi Dunia',
      fontSize: 28,
    },
    legend: {
      display: true,
      position: 'right',
    },
  },
  responsive: true,
};

function getRandomColor() {
  const letters = '0123456789ABCDEF'.split('');
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function PieChart({ data }) {
  const [chartData, setChartData] = useState({
    labels: [''],
    datasets: [],
  });

  useEffect(() => {
    setChartData({
      labels: data.map(pop => pop.Country),
      datasets: [
        {
          label: '2015',
          borderColor: 'rgba(0,0,0,1)',
          backgroundColor: data.map(pop => getRandomColor()),
          borderWidth: 2,
          data: data.map(pop => pop[`World Population Percentage`]),
        },
      ],
    });
  }, [data]);

  return <Pie data={chartData} options={options} />;
}

export default PieChart;
