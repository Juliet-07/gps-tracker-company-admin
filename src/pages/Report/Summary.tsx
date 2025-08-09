import { useState } from "react";
import axiosInstance from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, ChartBar } from "lucide-react";
import * as XLSX from "xlsx";

const SummaryReport = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [generatedReports, setGeneratedReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const excludedFields = ["attributes", "deviceId"];

  const fetchDevices = async () => {
    const res = await axiosInstance.get(`${apiURL}/devices`, {
      withCredentials: true,
    });
    return res.data;
  };

  const { data: devices = [] } = useQuery({
    queryKey: ["devices", "devices-table"],
    queryFn: fetchDevices,
    staleTime: 5 * 60 * 1000,
  });

  const handleGenerateReport = async () => {
    if (!selectedDevice || !fromDate || !toDate) {
      alert("Please select device and dates.");
      return;
    }

    try {
      const deviceId = selectedDevice.id;
      const from = new Date(fromDate).toISOString();
      const to = new Date(toDate).toISOString();

      const url = `${apiURL}/reports/summary?deviceId=${deviceId}&from=${from}&to=${to}`;

      const response = await axiosInstance.get(url, {
        responseType: "json",
        withCredentials: true,
      });

      const jsonData = response.data;
    //   console.log(jsonData, "checking whay is here");
      if (!jsonData || jsonData.length === 0) {
        alert("No summary data found for the selected filters.");
        setGeneratedReports([]); // clear any previous data
        return; // stop further processing
      }
      setGeneratedReports(jsonData);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error generating summary report:", error);
      alert("Failed to generate report. Please try again.");
    }
  };

  const totalPages = Math.ceil(generatedReports.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = generatedReports.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div className="flex-1 flex flex-col">
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-800">Summary Report</h1>
        <p className="text-gray-600 text-sm">
          Generate summary reports for your devices
        </p>
      </header>

      <main className="flex-1 p-4 md:p-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Filters</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">
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
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                From Date
              </Label>
              <Input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                To Date
              </Label>
              <Input
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

        {generatedReports.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-6 text-center my-4">
            <p className="text-gray-500">No report generated.</p>
          </div>
        ) : (
          <div className="bg-white shadow overflow-x-auto sm:rounded-lg my-10">
            <div className="px-4 py-5 sm:p-6">
              <div className="w-full flex items-center justify-between my-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Summary Report &mdash;{" "}
                  <span className="text-gray-600">
                    {generatedReports.length} records
                  </span>
                </h3>
                <Button
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => {
                    const worksheet =
                      XLSX.utils.json_to_sheet(generatedReports);
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

              <table className="min-w-full text-sm md:text-base divide-y divide-gray-200 overflow-x-auto">
                <thead className="bg-gray-50">
                  <tr>
                    {Object.keys(generatedReports[0])
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
                  {currentRows.map((row, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      {Object.entries(row)
                        .filter(([key]) => !excludedFields.includes(key))
                        .map(([_, value], i) => (
                          <td
                            key={i}
                            className="px-4 md:px-6 py-2 md:py-4 whitespace-nowrap text-gray-900"
                          >
                            {value?.toString().slice(0, 60) || "-"}
                          </td>
                        ))}
                    </tr>
                  ))}
                </tbody>
              </table>

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
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SummaryReport;
