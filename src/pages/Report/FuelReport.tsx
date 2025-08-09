import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Download, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as XLSX from "xlsx";

const FuelReport = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [fuelData, setFuelData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const excludedFields = ["deviceId"];

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

  const handleGenerateRouteHistory = async () => {
    const deviceId = selectedDevice?.id;
    if (!deviceId) {
      alert("Please select a device");
      return;
    }

    const from = new Date(fromDate).toISOString();
    const to = new Date(toDate).toISOString();

    try {
      const url = `${apiURL}/reports/fuel?deviceId=${deviceId}&from=${from}&to=${to}`;
      const response = await axiosInstance.get(url, {
        responseType: "json",
        withCredentials: true,
      });

      const jsonData = response.data;
      if (!jsonData || jsonData.length === 0) {
        alert("No summary data found for the selected filters.");
        setFuelData([]); // clear any previous data
        return; // stop further processing
      }
      setFuelData(jsonData);
      // console.log(jsonData, "checking the data");
    } catch (error) {
      console.error("Error generating fuel report:", error);
      alert("Failed to generate fuel report. Please try again.");
    }
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = fuelData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(fuelData.length / rowsPerPage);

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="p-2 text-gray-600 hover:text-primary"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-semibold text-gray-800">
              Fuel Report
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 overflow-auto bg-slate-200">
        {/* Filter Panel */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Search Filters
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Devices
              </label>
              <Select
                onValueChange={(value) => {
                  const device = devices.find((d) => d.id === value);
                  setSelectedDevice(device);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a device" />
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From Date
              </label>
              <Input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To Date
              </label>
              <Input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="hidden md:block self-end">
              <Button
                onClick={handleGenerateRouteHistory}
                className="bg-primary text-white hover:bg-blue-600"
              >
                <Search className="mr-2 h-4 w-4" />
                Get Fuel Report
              </Button>
            </div>
            <div className="block md:hidden self-end">
              <Button
                onClick={handleGenerateRouteHistory}
                className="bg-primary text-white hover:bg-blue-600"
              >
                <Search className="mr-2 h-4 w-4" />
                Get Fuel Data
              </Button>
            </div>
          </div>
        </div>

        {/* History table */}
        {fuelData.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-6 text-center my-4">
            <p className="text-gray-500">
              No fuel data found for this device in the selected period.
            </p>
          </div>
        ) : (
          <div className="bg-white shadow overflow-x-auto sm:rounded-lg my-10">
            <div className="px-4 py-5 sm:p-6">
              <div className="w-full flex items-center justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Fuel Data ({fuelData.length} records)
                </h3>
                <Button
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => {
                    const worksheet = XLSX.utils.json_to_sheet(fuelData);
                    const workbook = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(
                      workbook,
                      worksheet,
                      "Summary"
                    );
                    XLSX.writeFile(workbook, "summary-report.xlsx");
                  }}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Excel
                </Button>
              </div>

              <div className="w-full overflow-x-auto">
                <table className="min-w-full text-sm md:text-base divide-y divide-gray-200 overflow-x-auto">
                  <thead className="bg-gray-50">
                    <tr>
                      {Object.keys(fuelData[0])
                        .filter((key) => !excludedFields.includes(key))
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
                          .filter(([key]) => !excludedFields.includes(key))
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
                  <div className="w-full my-6 flex justify-end items-center space-x-2">
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

export default FuelReport;
