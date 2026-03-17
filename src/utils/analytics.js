export function calculateMetrics(data) {
    
  const totalCalls = data.length

  const totalCost = Math.round(data.reduce(
    (sum, call) => sum + Number(call.callCost),
    0)
  );

  const avgDuration =
    data.reduce((sum, call) => sum + call.callDuration, 0) /
    (data.length || 1)

  const success = data.filter(
    call => call.callStatus === true
  ).length

  const failed = data.filter(
    call => call.callStatus === false
  ).length

  return {
    totalCalls,
    totalCost,
    avgDuration: Math.round(avgDuration),
    success,
    failed
  }
}