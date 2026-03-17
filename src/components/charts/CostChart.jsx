import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const CostChart = ({ data }) => {
 
  const chartData = data.map(call => ({
    name: call.callerName,  
    cost: Number(call.callCost) 
  }));


  const totalCost = chartData.reduce((sum, c) => sum + c.cost, 0); 
  const avgCost = totalCost / (chartData.length || 1);              

  return (
    <div className="p-4">
      <h2 className="text-center text-xl font-bold text-amber-800 ">Call Cost Analytics</h2>

      <BarChart width={600} height={300} data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" /> {/* optional grid for readability */}
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => `$${value}`} />
        <Bar dataKey="cost" fill="#8884d8" />
      </BarChart>

      <ul className="mb-4 mt-5 pt-5 space-y-1 flex flex-col justify-center items-center p-2">
        <li className="text-xl text-pink-700 italic font-bold">Total Cost: <span className="italic  text-green-600 text-xl">£ {totalCost.toFixed(2)}</span></li>
        <li className="text-xl text-pink-700 italic font-bold">Average Cost per Call: <span className="italic text-green-600 text-xl">£ {avgCost.toFixed(2)}</span></li>
      </ul>
    </div>
  );
};

export default CostChart;