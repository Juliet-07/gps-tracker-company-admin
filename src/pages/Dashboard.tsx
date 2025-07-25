import { Button } from "@/components/ui/button";
import { Car, Map, ChartBar } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Sample data for Vehicle Driven KM chart with high values
  const drivenKmData = [
    { date: "05 Jun", km: 245 },
    { date: "06 Jun", km: 320 },
    { date: "07 Jun", km: 280 },
    { date: "08 Jun", km: 410 },
    { date: "09 Jun", km: 380 },
    { date: "10 Jun", km: 290 },
    { date: "11 Jun", km: 450 },
    { date: "12 Jun", km: 380 },
    { date: "13 Jun", km: 520 },
    { date: "14 Jun", km: 480 },
  ];

  // Sample data for Day/Night chart with high values
  const dayNightData = [
    { date: "05 Jun", day: 180, night: 65 },
    { date: "06 Jun", day: 220, night: 100 },
    { date: "07 Jun", day: 195, night: 85 },
    { date: "08 Jun", day: 280, night: 130 },
    { date: "09 Jun", day: 250, night: 130 },
    { date: "10 Jun", day: 200, night: 90 },
    { date: "11 Jun", day: 310, night: 140 },
    { date: "12 Jun", day: 260, night: 120 },
    { date: "13 Jun", day: 350, night: 170 },
    { date: "14 Jun", day: 320, night: 160 },
  ];

  // Sample data for mini chart with high values
  const miniChartData = [
    { value: 45 },
    { value: 62 },
    { value: 58 },
    { value: 75 },
    { value: 68 },
    { value: 82 },
    { value: 78 },
  ];

  const chartConfig = {
    km: {
      label: "Kilometers",
      color: "hsl(var(--primary))",
    },
    day: {
      label: "Day Driven",
      color: "hsl(var(--success))",
    },
    night: {
      label: "Night Driven",
      color: "hsl(var(--primary))",
    },
    value: {
      label: "Value",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <div className="flex-1 p-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Vehicles */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">All Devices</p>
              <div className="flex items-center">
                <Car className="text-gray-400 mr-2 h-5 w-5" />
                <span className="text-3xl font-bold text-gray-800">4</span>
              </div>
            </div>
            <div className="w-16 h-12">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <BarChart data={miniChartData}>
                  <Bar dataKey="value" fill="var(--color-value)" />
                </BarChart>
              </ChartContainer>
            </div>
          </div>
          <div className="mt-4 bg-gray-100 p-3 rounded">
            <p className="text-sm font-medium text-gray-700">Total Devices</p>
          </div>
        </div>

        {/* Running Vehicles */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Currently</p>
              <div className="flex items-center">
                <Car className="text-gray-400 mr-2 h-5 w-5" />
                <span className="text-3xl font-bold text-gray-800">4</span>
              </div>
            </div>
          </div>
          <div className="mt-4 bg-green-500 text-white p-3 rounded text-center">
            <p className="text-sm font-medium">25% Active</p>
          </div>
        </div>

        {/* Idle Vehicles */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Currently</p>
              <div className="flex items-center">
                <Car className="text-gray-400 mr-2 h-5 w-5" />
                <span className="text-3xl font-bold text-gray-800">3</span>
              </div>
            </div>
          </div>
          <div className="mt-4 bg-yellow-500 text-white p-3 rounded text-center">
            <p className="text-sm font-medium">75% Idle</p>
          </div>
        </div>

        {/* Stopped Vehicles */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Currently</p>
              <div className="flex items-center">
                <Car className="text-gray-400 mr-2 h-5 w-5" />
                <span className="text-3xl font-bold text-gray-800">7</span>
              </div>
            </div>
          </div>
          <div className="mt-4 bg-red-500 text-white p-3 rounded text-center">
            <p className="text-sm font-medium">15% Stop</p>
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Map Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Go to Map
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Vehicle, History, Replay View, Live Location, Immobilize, Status
                etc.
              </p>
              <Link to="/map">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Map className="mr-2 h-4 w-4" />
                  View Map
                </Button>
              </Link>
            </div>
            <div className="w-48 h-32 ml-4">
              <img
                className="w-full h-full object-cover rounded"
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/d45c78fd41-28edb684b20f2c0dd7a4.png"
                alt="GPS tracking dashboard illustration with vehicles and map interface"
              />
            </div>
          </div>
        </div>

        {/* Report Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Go to Report
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Vehicle log, Over Speed, Wise Summary, Detail Summary, Timeline,
                Driver Summary etc.
              </p>
              <Link to="/reports">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <ChartBar className="mr-2 h-4 w-4" />
                  View Reports
                </Button>
              </Link>
            </div>
            <div className="w-48 h-32 ml-4">
              <img
                className="w-full h-full object-cover rounded"
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/601633da13-bac6d2540024c054d8e1.png"
                alt="Analytics dashboard with charts and reports illustration"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vehicle Driven KM Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Device Track KM
            </h3>
            <span className="text-gray-600 text-sm">Year 2025</span>
          </div>
          <div className="h-64">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <LineChart data={drivenKmData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} domain={[0, 600]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="km"
                  stroke="var(--color-km)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </div>
        </div>

        {/* Day/Night Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Day / Night Driven
          </h3>
          <div className="h-64">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <BarChart data={dayNightData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} domain={[0, 400]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="day" fill="var(--color-day)" />
                <Bar dataKey="night" fill="var(--color-night)" />
              </BarChart>
            </ChartContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Day Driven</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Night Driven</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
