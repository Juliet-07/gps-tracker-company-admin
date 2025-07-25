import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
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
import axiosInstance from "@/api/axios";
import { blob } from "stream/consumers";

const Reports = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const [reportType, setReportType] = useState("");
  const [device, setDevice] = useState("");
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [fromDate, setFromDate] = useState("2025-06-01");
  const [toDate, setToDate] = useState("2025-06-14");
  const [generatedReports, setGeneratedReports] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

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
    history: "history",
    overspeed: "overspeed",
    geofence: "geofence",
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
      const file = response.data;
      const text = await file.text();
      console.log("Generated report:", file);
      console.log("Generated report text:", text);
      const fileBlob = new Blob([file], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const fileUrl = URL.createObjectURL(fileBlob);

      alert("Report generated successfully!");
      setIsModalOpen(true);
      setPreviewUrl(fileUrl);

      //Update state or UI with `data`
      const generatedReport = {
        type: typePath,
        device: selectedDevice.name,
        dateRange: `${from} - ${to}`,
        generated: new Date().toLocaleString(),
        status: "Success",
        statusColor: "bg-green-500",
      };
      // setGeneratedReports(generatedReport);
    } catch (error) {
      console.error("Error generating report:", error);
      alert("Failed to generate report. Please try again.");
    }
  };

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
                  <SelectItem value="history">History Report</SelectItem>
                  <SelectItem value="overspeed">Overspeed Report</SelectItem>
                  {/* <SelectItem value="geofence">Geofence Report</SelectItem> */}
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
        {/* Report Types */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {reportCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.id}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`w-12 h-12 ${card.bgColor} bg-opacity-10 rounded-lg flex items-center justify-center mr-4`}
                  >
                    <IconComponent
                      className={`${card.iconColor} text-xl`}
                      size={24}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{card.subtitle}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">{card.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{card.stats}</span>
                  <ArrowRight className="text-primary" size={16} />
                </div>
              </div>
            );
          })}
        </div>
        {/* Generated Reports */}
        {/* <div className="hidden md:block bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                Generated Reports
              </h3>
              <Button
                variant="link"
                className="text-primary hover:text-indigo-700 text-sm font-medium p-0"
              >
                View All
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Report Type
                  </TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Device
                  </TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Range
                  </TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Generated
                  </TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentReports.map((report, index) => {
                  const IconComponent = report.icon;
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center">
                          <IconComponent
                            className={`${report.iconColor} mr-2`}
                            size={16}
                          />
                          <span className="text-sm font-medium text-gray-900">
                            {report.type}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-900">
                        {report.device}
                      </TableCell>
                      <TableCell className="text-sm text-gray-900">
                        {report.dateRange}
                      </TableCell>
                      <TableCell className="text-sm text-gray-900">
                        {report.generated}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${report.statusColor} text-white text-xs`}
                        >
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-primary hover:text-indigo-700 p-1"
                          >
                            <Download size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-gray-600 p-1"
                          >
                            <Eye size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div> */}
        {/* Report Preview */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white w-full max-w-4xl h-[90vh] rounded-lg overflow-hidden shadow-lg relative">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-semibold">Report Preview</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-600 hover:text-black"
                >
                  ✕
                </button>
              </div>
              <iframe
                src={previewUrl}
                className="w-full h-full"
                frameBorder="0"
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Reports;
