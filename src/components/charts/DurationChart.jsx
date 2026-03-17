import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const DurationChart = ({ data }) => {
  
  const chartData = data.map(call => ({
    name: call.callerName,        
    duration: call.callDuration  
  }));


  const durations = data.map(call => call.callDuration);
  const longestCall = Math.max(...durations);       
  const shortestCall = Math.min(...durations);      
  const avgDuration =
    durations.reduce((sum, d) => sum + d, 0) / (durations.length || 1); 

  return (
    <div className="p-4">
     
      <h3 className="text-center text-xl font-bold text-amber-800 ">Call Duration Insights</h3>
     

    
      <BarChart width={600} height={300} data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" /> 
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="duration" fill="#8884d8" />
      </BarChart>

      <ul className="pt-5 mt-5 space-y-1 flex flex-col justify-center items-center p-2">

        <li className="text-xl text-pink-700 italic font-bold"> Longest Call: <span className="italic  text-green-600 text-xl">{longestCall} seconds</span></li>
        <li className="text-xl text-pink-700 italic font-bold">Shortest Call: <span className="italic  text-green-600 text-xl">{shortestCall} seconds</span></li>
        <li className="text-xl text-pink-700 italic font-bold">Average Duration:<span className="italic  text-green-600 text-xl"> {Math.round(avgDuration)} seconds</span></li>
      </ul>

    </div>
  );
};

export default DurationChart;