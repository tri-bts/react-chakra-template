import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, BarElement, Title, Tooltip, Legend);

import { Bar } from 'react-chartjs-2';

const options = {
  plugins: {
    title: {
      display: true,
      text: 'Data Jumlah Penduduk di Benua Asia',
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

function BarChart({ data }) {
  const [chartData, setChartData] = useState({
    labels: ['Rank'],
    datasets: [],
  });

  useEffect(() => {
    setChartData({
      labels: data.map(pop => pop.CCA3),
      datasets: [
        {
          label: '2015',
          borderColor: 'rgba(0,0,0,1)',
          backgroundColor: getRandomColor(),
          borderWidth: 2,
          data: data.map(pop => pop[`1970 Population`]),
        },
        {
          label: '2022',
          borderColor: 'rgba(0,0,0,1)',
          backgroundColor: getRandomColor(),
          borderWidth: 2,
          data: data.map(pop => pop[`2022 Population`]),
        },
      ],
    });
  }, [data]);

  return <Bar data={chartData} options={options} />;
}

export default BarChart;
