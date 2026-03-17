import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts"

const TrendChart = ({ data }) => {

  const chartData = data.map(call => ({
    name: call.callerName,
    duration: call.callDuration
  }))

  return (

    <LineChart width={500} height={300} data={chartData}>

      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />

      <Line
        type="monotone"
        dataKey="duration"
      />

    </LineChart>

  )

}

export default TrendChart