import { Card, CardHeader, CardContent } from "@/components/ui/card"

const KpiCard = ({ title,value }) => {

 return (

  <Card className="shadow-sm">

   <CardHeader className="text-bg-500 text-3xl bg-stone-300 p-3 text-center text-green-800">
     {title}
   </CardHeader>

   <CardContent className="text-2xl font-bold p-3 text-center bg-gray-200  text-red-500">
     {value}
   </CardContent>

  </Card>

 )

}

export default KpiCard