import { useEffect,useState } from "react"
import { fetchCalls } from "../services/api"
import { calculateMetrics } from "../utils/analytics"

import KpiCard from "../components/cards/KpiCard"
import DurationChart from "../components/charts/DurationChart"
import CostChart from "../components/charts/CostChart"
import TimelineChart from "../components/charts/TimelineChart"
import CallLogsTable from "../components/table/CallLogsTable"
import CityChart from "@/components/charts/CityChart"




const Dashboard = () => {

 const [calls,setCalls] = useState([])
 const [search,setSearch] = useState("")

 useEffect(()=>{

  fetchCalls().then(data=>{
    setCalls(data)
  })

 },[])

 const metrics = calculateMetrics(calls)

 const filteredCalls = calls.filter(call =>

  call.callerName
  .toLowerCase()
  .includes(search.toLowerCase())

 )

 return(

<div className="space-y-6">

<h1 className="text-4xl font-bold text-center  text-blue-800  p-1">
 Call Analytics Dashboard
</h1>

<div className="grid grid-cols-5 gap-4">

<KpiCard title="Total Calls" value={metrics.totalCalls}/>
<KpiCard title="Total Cost" value={`£ ${metrics.totalCost}`}/>
<KpiCard title="Avg Duration" value={`${metrics.avgDuration}s`}/>
<KpiCard title="Success" value={metrics.success}/>
<KpiCard title="Failed" value={metrics.failed}/>

</div>

<div className="grid grid-cols-2 gap-6">

<DurationChart data={calls}/>
<CostChart data={calls}/>
<TimelineChart data={calls}/>
<CityChart data={calls}/>

</div>

<CallLogsTable data={filteredCalls}/>

</div>

 )

}

export default Dashboard