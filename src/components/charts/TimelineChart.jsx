import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const TimelineChart = ({ data }) => {
  const chartData = data.map((call, index) => ({
    name: `Call ${index + 1}`,
    duration: call.callDuration
  }));

  const totalCalls = data.length;
  const avgDuration =
    data.reduce((sum, call) => sum + call.callDuration, 0) / (totalCalls || 1);

  const longestCall = Math.max(...data.map(call => call.callDuration));
  const shortestCall = Math.min(...data.map(call => call.callDuration));

  return (
    <div className="p-4">
      
      <h2 className="text-center text-xl font-bold text-amber-800">Call Duration Timeline</h2>
     

      <LineChart
        width={600}
        height={300}
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" label={{ value: 'Call Sequence', position: 'insideBottomRight', offset: -5 }} />
        <YAxis label={{ value: 'Duration (sec)', angle: -90, position: 'insideLeft' }} />
        <Tooltip formatter={(value) => `${value} sec`} />
        <Line type="monotone" dataKey="duration" stroke="#8884d8" strokeWidth={2} />
      </LineChart>

      <ul className="mb-4 mt-5 pt-5 space-y-1 flex flex-col justify-center items-center p-2">
        <li className="text-xl text-pink-700 italic font-bold">Total Calls: <span className="italic text-blue-600">{totalCalls}</span></li>
        <li className="text-xl text-pink-700 italic font-bold">Longest Call: <span className="italic text-red-600">{longestCall} sec</span></li>
        <li className="text-xl text-pink-700 italic font-bold">Shortest Call: <span className="italic text-green-600">{shortestCall} sec</span></li>
        <li className="text-xl text-pink-700 italic font-bold">Average Duration: <span className="italic text-purple-600">{Math.round(avgDuration)} sec</span></li>
      </ul>
    </div>
  );
};

export default TimelineChart;