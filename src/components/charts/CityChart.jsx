import React from "react";
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";

const CityChart = ({ data }) => {
  const cityCount = {};
  data.forEach(call => {
    const city = call.city;
    cityCount[city] = (cityCount[city] || 0) + 1;
  });

  
  let chartData = Object.keys(cityCount).map(city => ({
    name: city,
    value: cityCount[city]
  }));
  chartData.sort((a, b) => b.value - a.value);

  // Top 5 
  const topCities = chartData.slice(0, 5);
  const otherCities = chartData.slice(5);
  const othersValue = otherCities.reduce((sum, c) => sum + c.value, 0);
  if (othersValue > 0) topCities.push({ name: "Others", value: othersValue });

 
  const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6", "#6b7280"];
  const finalData = topCities.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length]
  }));

  return (
    <div className="p-4">
      <h2 className= "text-center text-xl font-bold text-amber-800">Calls by City</h2>

      <ResponsiveContainer width="600" height={300}>
        <PieChart>
          <Pie
            data={finalData}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={100}
          />

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <h4 className="text-lg ">Top 5 Cities</h4>
      <div className="mt-4 flex flex-col  justify-center  items-center italic gap-1">

        {finalData.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">

            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.fill }}
            ></span>

            <span className="text-lg text-center">
              {entry.name}
            </span>

          </div>))}
          </div>
    </div>
  );
};

export default CityChart;