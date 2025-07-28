import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, Save, Trash, Edit, Circle, InfoIcon, X } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

const chartData = [
  { time: "00:00", entries: 12, exits: 8 },
  { time: "04:00", entries: 8, exits: 5 },
  { time: "08:00", entries: 25, exits: 18 },
  { time: "12:00", entries: 35, exits: 28 },
  { time: "16:00", entries: 42, exits: 38 },
  { time: "20:00", entries: 28, exits: 22 },
];

const chartConfig = {
  entries: {
    label: "Entries",
    color: "hsl(var(--chart-1))",
  },
  exits: {
    label: "Exits",
    color: "hsl(var(--chart-2))",
  },
};

export const GeofenceForm = () => {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <div className="flex-1 flex flex-col max-h-[80vh] overflow-y-auto">
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div>
              <Label className="block text-gray-700 text-sm font-medium mb-2">
                Geofence Name
              </Label>
              <Input
                type="text"
                className="w-full"
                placeholder="Enter geofence name"
              />
            </div>
            <div>
              <Label className="block text-gray-700 text-sm font-medium mb-2">
                Type
              </Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="circle">Circle</SelectItem>
                  <SelectItem value="polygon">Polygon</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="block text-gray-700 text-sm font-medium mb-2">
                Description
              </Label>
              <Textarea
                className="w-full"
                rows={3}
                placeholder="Enter description"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="block text-gray-700 text-sm font-medium mb-2">
                Assign to Devices
              </Label>
              <div className="border border-gray-300 rounded-lg p-3 h-32 overflow-y-auto">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox className="mr-2" />
                    <span className="text-sm">Vehicle-001</span>
                  </div>
                  <div className="flex items-center">
                    <Checkbox className="mr-2" />
                    <span className="text-sm">Vehicle-002</span>
                  </div>
                  <div className="flex items-center">
                    <Checkbox className="mr-2" />
                    <span className="text-sm">Vehicle-003</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Label className="block text-gray-700 text-sm font-medium mb-2">
                Alert Type
              </Label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Checkbox className="mr-2" />
                  <span className="text-sm">Entry Alert</span>
                </div>
                <div className="flex items-center">
                  <Checkbox className="mr-2" />
                  <span className="text-sm">Exit Alert</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="block text-gray-700 text-sm font-medium mb-2">
                Drawing Tools
              </Label>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <Button
                  variant="outline"
                  className="bg-gray-100 hover:bg-gray-200 p-3 h-16 flex flex-col items-center"
                >
                  <Circle className="text-primary text-xl mb-1" />
                  <span className="text-xs">Circle</span>
                </Button>
                <Button
                  variant="outline"
                  className="bg-gray-100 hover:bg-gray-200 p-3 h-16 flex flex-col items-center"
                >
                  <svg
                    className="w-5 h-5 text-primary mb-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2L3 7v11h4v-6h6v6h4V7l-7-5z" />
                  </svg>
                  <span className="text-xs">Polygon</span>
                </Button>
              </div>
              <div className="space-y-2">
                <Button className="w-full bg-green-500 text-white hover:bg-green-600">
                  <Save className="mr-2 h-4 w-4" />
                  Save Geofence
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-gray-300 text-gray-700 hover:bg-gray-400"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Clear All
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              Activity Chart
            </h3>
            <p className="text-sm text-gray-600">
              Geofence entries and exits over time
            </p>
          </div>
          <div className="p-4">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <LineChart data={chartData}>
                <XAxis
                  dataKey="time"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="entries"
                  stroke="var(--color-entries)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-entries)", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="exits"
                  stroke="var(--color-exits)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-exits)", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ChartContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              Active Geofences
            </h3>
          </div>
          <div className="p-4 space-y-3">
            <div className="border border-gray-200 rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-800">Office Zone</h4>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 text-primary hover:text-indigo-700"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 text-red-500 hover:text-red-700"
                  >
                    <Trash className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">Circle • 500m radius</p>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">
                  Active
                </span>
                <span className="text-xs text-gray-500">3 devices</span>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-800">Warehouse Area</h4>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 text-primary hover:text-indigo-700"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 text-red-500 hover:text-red-700"
                  >
                    <Trash className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">Polygon • 8 points</p>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">
                  Active
                </span>
                <span className="text-xs text-gray-500">2 devices</span>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-800">Restricted Zone</h4>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 text-primary hover:text-indigo-700"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 text-red-500 hover:text-red-700"
                  >
                    <Trash className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">Circle • 200m radius</p>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-yellow-500 text-white px-2 py-1 rounded">
                  Inactive
                </span>
                <span className="text-xs text-gray-500">1 device</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
