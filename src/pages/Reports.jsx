import React, { useState, useEffect } from "react";
import DurationChart from "@/components/charts/DurationChart";
import CostChart from "@/components/charts/CostChart";
import TimelineChart from "@/components/charts/TimelineChart";
import CityChart from "@/components/charts/CityChart";

const Reports = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://69b30b45e224ec066bdb55a0.mockapi.io/api/v1/cdr");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Error fetching call logs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading reports...</div>;

  if (!data.length) return <div className="text-center mt-10">No call data available.</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>

     
      <div className="bg-white dark:bg-slate-200 p-4 rounded shadow dark:text-black">
        
        <DurationChart data={data} />
      </div>

      {/* Call Cost Analytics */}
      <div className="bg-white dark:bg-slate-200 p-4 rounded shadow">
       
        <CostChart data={data} />
      </div>

      {/* Call Activity Timeline */}
      <div className="bg-white dark:bg-slate-200 p-4 rounded shadow">
        <TimelineChart data={data} />
      </div>

      {/* Calls by City */}
      <div className="bg-white dark:bg-slate-200 p-4 rounded shadow dark:text-black">
        <CityChart data={data} />
      </div>
    </div>
  );
};

export default Reports;