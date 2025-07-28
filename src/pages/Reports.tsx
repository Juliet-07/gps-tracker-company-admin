import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  ChartBar,
  Route,
  Pause,
  History,
  Download,
  Eye,
  ArrowRight,
  Shapes,
  Cog,
} from "lucide-react";
import * as XLSX from "xlsx";

const Reports = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const [reportType, setReportType] = useState("");
  const [device, setDevice] = useState("");
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [generatedReports, setGeneratedReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const reportCards = [
    {
      id: "trip-report",
      title: "Trip Reports",
      subtitle: "Vehicle journey details",
      description:
        "Get detailed information about vehicle trips including start/end points, duration, distance, and route taken.",
      icon: Route,
      iconColor: "text-primary",
      bgColor: "bg-primary",
      stats: "Last 7 days: 24 trips",
    },
    {
      id: "stop-report",
      title: "Stop Reports",
      subtitle: "Vehicle stop analysis",
      description:
        "Track vehicle stops, idle time, and parking locations with detailed duration and location information.",
      icon: Pause,
      iconColor: "text-warning",
      bgColor: "bg-warning",
      stats: "Last 7 days: 156 stops",
    },
    {
      id: "history-report",
      title: "History Reports",
      subtitle: "Complete vehicle history",
      description:
        "Comprehensive vehicle movement history with timestamps, coordinates, and speed data.",
      icon: History,
      iconColor: "text-success",
      bgColor: "bg-success",
      stats: "Available data: 30 days",
    },
    {
      id: "overspeed-report",
      title: "Overspeed Reports",
      subtitle: "Speed violation events",
      description:
        "Monitor speed violations with detailed information about location, duration, and maximum speed reached.",
      icon: ChartBar,
      iconColor: "text-danger",
      bgColor: "bg-danger",
      stats: "Last 7 days: 8 violations",
    },
    // {
    //   id: "geofence-report",
    //   title: "Geofence Reports",
    //   subtitle: "Zone entry/exit events",
    //   description:
    //     "Track geofence violations including entry and exit times from designated areas.",
    //   icon: Shapes,
    //   iconColor: "text-purple-500",
    //   bgColor: "bg-purple-500",
    //   stats: "Last 7 days: 12 events",
    // },
    // {
    //   id: "custom-report",
    //   title: "Custom Reports",
    //   subtitle: "Build your own report",
    //   description:
    //     "Create custom reports with specific parameters and data points tailored to your needs.",
    //   icon: Cog,
    //   iconColor: "text-indigo-500",
    //   bgColor: "bg-indigo-500",
    //   stats: "Templates: 5 saved",
    // },
  ];

  const recentReports = [
    {
      type: "Trip Report",
      icon: Route,
      iconColor: "text-primary",
      device: "Vehicle 001",
      dateRange: "Jun 01 - Jun 07",
      generated: "2 hours ago",
      status: "Completed",
      statusColor: "bg-success",
    },
    {
      type: "Overspeed Report",
      icon: ChartBar,
      iconColor: "text-danger",
      device: "All Devices",
      dateRange: "Jun 08 - Jun 14",
      generated: "5 hours ago",
      status: "Processing",
      statusColor: "bg-warning",
    },
    {
      type: "Geofence Report",
      icon: Shapes,
      iconColor: "text-purple-500",
      device: "Vehicle 002",
      dateRange: "Jun 10 - Jun 14",
      generated: "1 day ago",
      status: "Completed",
      statusColor: "bg-success",
    },
  ];

  const reportTypeMap: Record<string, string> = {
    trip: "trips",
    stop: "stops",
    summary: "summary",
  };

  const fetchDevices = async () => {
    const res = await axiosInstance.get(`${apiURL}/devices`, {
      withCredentials: true,
    });
    console.log(res.data, "response");
    return res.data;
  };

  const {
    data: devices = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["industries"],
    queryFn: fetchDevices,
    staleTime: 5 * 60 * 1000,
  });

  const handleGenerateReport = async () => {
    const deviceId = selectedDevice.id;
    try {
      if (!reportType || !deviceId) {
        alert("Please select a report type and device.");
        return;
      }

      const typePath = reportTypeMap[reportType];
      const from = new Date(fromDate).toISOString();
      const to = new Date(toDate).toISOString();

      const url = `${apiURL}/reports/${typePath}?deviceId=${deviceId}&from=${from}&to=${to}`;
      const response = await axiosInstance.get(url, {
        responseType: "blob",
        headers: {
          Accept: "*/*",
        },
        withCredentials: true,
      });
      alert("Report generated successfully!");
      const blob = response.data;
      // Download in Excel;
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `route-history-${deviceId}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);

      const arrayBuffer = await blob.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });

      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet, { range: 7 });
      setGeneratedReports(jsonData);
      console.log(jsonData, "checking the data");
      console.log(Object.keys(jsonData[0]));
    } catch (error) {
      console.error("Error generating report:", error);
      alert("Failed to generate report. Please try again.");
    }
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = generatedReports.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(generatedReports.length / rowsPerPage);
  return (
    <div className="flex-1 flex flex-col">
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Reports</h1>
            <p className="text-gray-600 text-sm">
              Generate comprehensive reports for your devices
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6">
        {/* Report Generator */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Report Filters
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <Label
                htmlFor="report-type"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Report Type
              </Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trip">Trip Report</SelectItem>
                  <SelectItem value="stop">Stop Report</SelectItem>
                  <SelectItem value="summary">Summary Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label
                htmlFor="device"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Device
              </Label>
              <Select
                onValueChange={(value) => {
                  const device = devices.find((d) => d.id === value);
                  setSelectedDevice(device);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select device" />
                </SelectTrigger>
                <SelectContent>
                  {devices.map((device) => (
                    <SelectItem key={device.id} value={device.id}>
                      {device.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label
                htmlFor="from-date"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                From Date
              </Label>
              <Input
                id="from-date"
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Label
                htmlFor="to-date"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                To Date
              </Label>
              <Input
                id="to-date"
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex items-end">
              <Button
                onClick={handleGenerateReport}
                className="w-full bg-primary text-white hover:bg-indigo-700"
              >
                <ChartBar className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </div>
          </div>
        </div>
        {/* Generated Reports */}
        {generatedReports.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-6 text-center my-4">
            <p className="text-gray-500">No report generated.</p>
          </div>
        ) : (
          <div className="bg-white shadow overflow-x-auto sm:rounded-lg my-10">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                {reportTypeMap[reportType]?.replace(/^\w/, (c) =>
                  c.toUpperCase()
                )}{" "}
                Report &mdash;{" "}
                <span className="text-gray-600">
                  {generatedReports.length} records
                </span>
              </h3>

              <div className="w-full overflow-x-auto">
                <table className="min-w-full text-sm md:text-base divide-y divide-gray-200 overflow-x-auto">
                  <thead className="bg-gray-50">
                    <tr>
                      {Object.keys(generatedReports[0])
                        // .filter((key) => !excludedFields.includes(key))
                        .map((key) => (
                          <th
                            key={key}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {key}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentRows.map((row, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        {Object.entries(row)
                          // .filter(([key]) => !excludedFields.includes(key))
                          .map(([_, value], cellIndex) => (
                            <td
                              key={cellIndex}
                              className="px-4 md:px-6 py-2 md:py-4 whitespace-nowrap text-gray-900"
                            >
                              {value?.toString().slice(0, 60) || "-"}
                            </td>
                          ))}
                      </tr>
                    ))}
                  </tbody>
                  <div className="md:w-[300px] mt-6 flex justify-center items-center space-x-2">
                    <Button
                      variant="outline"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                    >
                      Prev
                    </Button>

                    <span className="text-sm text-gray-700">
                      Page {currentPage} of {totalPages}
                    </span>

                    <Button
                      variant="outline"
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Reports;
