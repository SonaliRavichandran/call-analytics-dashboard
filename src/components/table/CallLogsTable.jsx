import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CallLogsTable = ({ data }) => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const rowsPerPage = 10;


  const filteredData = data.filter(call =>
    call.callerName.toLowerCase().includes(search.toLowerCase()) ||
    call.city.toLowerCase().includes(search.toLowerCase())
  );

  
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortKey) return 0;

    if (sortOrder === "asc") {
      return a[sortKey] > b[sortKey] ? 1 : -1;
    } else {
      return a[sortKey] < b[sortKey] ? 1 : -1;
    }
  });

 
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  
  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  
  const exportToCSV = () => {
    const headers = [
      "Caller Name",
      "Caller Number",
      "Receiver Number",
      "City",
      "Duration",
      "Cost",
      "Start Time"
    ];

    const escapeCSV = (value) =>
      `"${String(value).replace(/"/g, '""')}"`;

    const rows = sortedData.map(call => [
      escapeCSV(call.callerName),
      escapeCSV(call.callerNumber),
      escapeCSV(call.receiverNumber),
      escapeCSV(call.city),
      escapeCSV(`${call.callDuration}s`),
      escapeCSV(`$${Number(call.callCost).toFixed(2)}`),
      escapeCSV(
        call.startTime && !isNaN(new Date(call.startTime))
          ? new Date(call.startTime).toLocaleString()
          : "N/A"
      )
    ]);

    const csvContent =
      [headers, ...rows]
        .map(row => row.join(","))
        .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "call_logs.csv";
    link.click();
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow">

    
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">

        <h2 className="text-left text-xl font-bold text-amber-800">
          Recent Call Logs
        </h2>

        <div className="flex gap-10 w-full md:w-auto ">
          <Input 
            placeholder="Search by name or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm text-black bg-gray-300 "
          />

          <Button className="bg-blue-600 text-white" onClick={exportToCSV}>
            Export CSV
          </Button>
        </div>

      </div>

      {/* 📊 Table */}
      <Table>
        <TableHeader className="bg-emerald-500">
          <TableRow>
            <TableHead onClick={() => handleSort("callerName")} className="cursor-pointer">Caller Name</TableHead>
            <TableHead>Caller Number</TableHead>
            <TableHead>Receiver Number</TableHead>
            <TableHead onClick={() => handleSort("city")} className="cursor-pointer ">City</TableHead>
            <TableHead onClick={() => handleSort("callDuration")} className="cursor-pointer">Duration</TableHead>
            <TableHead onClick={() => handleSort("callCost")} className="cursor-pointer">Cost</TableHead>
            <TableHead>Start Time</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginatedData.length > 0 ? (
            paginatedData.map((call, index) => (
              <TableRow className="text-black bg-gray-200" key={index}>

                <TableCell>{call.callerName}</TableCell>
                <TableCell>{call.callerNumber}</TableCell>
                <TableCell>{call.receiverNumber}</TableCell>
                <TableCell>{call.city}</TableCell>

                <TableCell>{call.callDuration}s</TableCell>

                <TableCell className="text-[#ef4444] font-medium">
                 £ {Number(call.callCost).toFixed(2)}
                </TableCell>

                <TableCell>
                  {!call.startTime || isNaN(new Date(call.startTime))
                    ? "N/A"
                    : new Date(call.startTime).toLocaleString()}
                </TableCell>

              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

    
      <div className="flex justify-end gap-2 mt-4">

        <Button className="text-black bg-gray-400 hover-gary-400"
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
        >
          Prev
        </Button>

        <span className="text-sm flex items-center px-2 text-black ">
          {currentPage} / {totalPages}
        </span>

        <Button className="text-black bg-gray-400 hover-gary-400"
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          Next
        </Button>

      </div>

    </div>
  );
};

export default CallLogsTable;