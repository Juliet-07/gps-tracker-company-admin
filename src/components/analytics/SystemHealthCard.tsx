
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Circle } from "lucide-react";

const healthMetrics = [
    { name: "API Response Time", value: "142ms", status: "ok", color: "text-green-500", valueColor: "text-green-600" },
    { name: "Database Performance", value: "Good", status: "ok", color: "text-green-500", valueColor: "text-green-600" },
    { name: "Server Load", value: "65%", status: "warning", color: "text-yellow-500", valueColor: "text-yellow-600" },
    { name: "Memory Usage", value: "42%", status: "ok", color: "text-green-500", valueColor: "text-green-600" },
];

const SystemHealthCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Health</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
            {healthMetrics.map(metric => (
                <div key={metric.name} className="flex items-center justify-between">
                    <span className="text-gray-600">{metric.name}</span>
                    <div className="flex items-center space-x-2">
                        <span className={`font-semibold ${metric.valueColor}`}>{metric.value}</span>
                        <Circle className={`h-2 w-2 ${metric.color}`} fill="currentColor" />
                    </div>
                </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};
export default SystemHealthCard;
