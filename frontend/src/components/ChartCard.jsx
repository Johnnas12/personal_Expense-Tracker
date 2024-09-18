/* eslint-disable react/prop-types */
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Card, Typography } from "@material-tailwind/react";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ChartCard = ({ title, data, options, type }) => {
  const ChartComponent = type === "bar" ? Bar : Pie;

  return (
    <Card className="p-4 w-max m-4">
      <Typography variant="h5" color="blue-gray" className="mb-4">
        {title}
      </Typography>
      <div className="h-64">
        <ChartComponent data={data} options={options} />
      </div>
    </Card>
  );
};

export default ChartCard;
