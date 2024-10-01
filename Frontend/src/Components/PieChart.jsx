import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { API_URL } from '../axios.js'; 
import axios from '../axios.js';

// Register the necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ RollNO }) => {
  const [chartData, setChartData] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/totalattendence?RollNO=${RollNO}`); // Replace with your API endpoint
        const apiData = response.data;

        // Assuming apiData has TotalLectures and PresentLectures directly
        const totalLectures = apiData.TotalLectures; // Adjust according to your actual API response structure
        const presentLectures = apiData.PresentLectures; // Adjust according to your actual API response structure

        // Calculate absent lectures
        const absentLectures = totalLectures - presentLectures;

        // Prepare the data for the pie chart
        setChartData({
          labels: ['Present', 'Absent'],
          datasets: [
            {
              label: 'Attendance',
              data: [presentLectures, absentLectures],
              backgroundColor: [
                'rgba(75, 192, 192, 0.2)', // Color for Present
                'rgba(255, 99, 132, 0.2)', // Color for Absent
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)',  // Border for Present
                'rgba(255, 99, 132, 1)',   // Border for Absent
              ],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [RollNO]); // Added RollNO as a dependency to refetch data if it changes

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.resentLectures}: ${tooltipItem.totalLectures-tooltipItem.presentLectures}`,
        },
      },
    },
  };

  return (
    <div>
    
      {/* Render chart only if data is available */}
      {chartData ? <Pie data={chartData} options={options} /> : <p>Loading chart...</p>}
    </div>
  );
};

export default PieChart;
