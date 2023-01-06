import React from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const RenderGraph = () => {
  const { weatherData } = useSelector((state) => state.city);

  const calculateAverage = (arr) => {
    const average = arr.reduce((a, b) => a + b) / arr.length;
    return average;
  };

  var graphData = [];
  if (weatherData.length) {
    graphData = weatherData.map((d) => ({
      name: d.city.name,
      temperature: calculateAverage(
        d.weather.daily.apparent_temperature_max
      ).toFixed(2),
    }));
  }
  
  return (
    <ResponsiveContainer width={'99%'} height={300}>
      <BarChart
        maxWidth={600}
        height={275}
        data={graphData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="temperature" stackId="a" fill="#8884d8" />
      </BarChart>
      </ResponsiveContainer>
  );
};

export default RenderGraph;
