import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../../App.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesGraph = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Products Sold',
        backgroundColor: "blue",
        data: [],
        barThickness: 20,
        borderWidth: 1,
        borderRadius: 15,
      },
      {
        label: 'Total Profit',
        backgroundColor: "green",
        data: [],
        barThickness: 20,
        borderWidth: 1,
        borderRadius: 15,
      }
    ]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/billing/salesData');
        const result = await response.json();

        const labels = result.map(item => item.day.split('T')[0]);
        const productsSoldData = result.map(item => item.productsSold);
        const profitData = result.map(item => item.totalProfit);

        setData({
          labels,
          datasets: [
            {
              label: 'Products Sold',
              backgroundColor: "blue",
              data: productsSoldData,
              barThickness: 20,
              borderWidth: 1,
              borderRadius: 15,
            },
            {
              label: 'Total Profit',
              backgroundColor: "green",
              data: profitData,
              barThickness: 20,
              borderWidth: 1,
              borderRadius: 15,
            }
          ]
        });
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    plugins: {
      legend: {
        display: true,
        font: {
          size: 30,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        }
      }
    }
  };

  return (
    <div className='shadow' style={{ width: "100%", maxWidth: "900px", margin: 'auto' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default SalesGraph;
