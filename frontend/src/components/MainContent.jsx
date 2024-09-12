import { useEffect, useState } from "react";
import ChartCard from "./ChartCard";
import axios from 'axios';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const calculateMonthlyTotals = (data) => {
  const totals = {};

  data.forEach((expense) => {
    const date = new Date(expense.createdAt); // Use createdAt as the date field
    if (!isNaN(date.getTime())) { // Check if the date is valid
      const month = date.getMonth(); // January is 0
      const year = date.getFullYear();
      const key = `${year}-${month}`; // Format as "2024-0" for January 2024

      if (!totals[key]) {
        totals[key] = 0;
      }

      totals[key] += expense.amount;
    }
  });

  return totals;
};


const calculateCategoryTotals = (data) => {
  const totals = {};

  data.forEach((expense) => {
    const category = expense.category;

    if (!totals[category]) {
      totals[category] = 0;
    }

    totals[category] += expense.amount;
  });

  return totals;
};


const MainContent = () => {
  const [chartData, setChartData] = useState({ labels: [], values: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/expenses/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const totals = calculateMonthlyTotals(response.data);
        const labels = Object.keys(totals)
          .map(key => {
            const [year, month] = key.split('-');
            return `${monthNames[parseInt(month)]} ${year}`; // Parse the month as an integer
          })
          .sort((a, b) => new Date(a) - new Date(b)); // Sort keys to display months in order

        const values = Object.keys(totals)
          .sort((a, b) => new Date(a) - new Date(b))
          .map(key => totals[key]);


            // Calculate category totals (for pie chart)
      const categoryTotals = calculateCategoryTotals(response.data);
      const categoryLabels = Object.keys(categoryTotals);
      const categoryValues = Object.values(categoryTotals);

        setChartData({ 
          labels, 
          values,  
          categoryLabels,
          categoryValues,
        });
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchData();
  }, []);

  const barData = {
    labels: chartData.labels,
    datasets: [{
      label: 'Total Expenses per Month',
      data: chartData.values,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }]
  };

  const pieData = {
    labels: chartData.categoryLabels,
    datasets: [
      {
        label: 'Expenses by Category',
        data: chartData.categoryValues,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(201, 203, 207, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="flex flex-wrap p-4">
      <ChartCard title="Expenses Over Time" data={barData} options={options} type="bar" />
      <ChartCard title="Category By Amount" data={pieData} options={options} type="pie" />
    </div>
  );
};

export default MainContent;
