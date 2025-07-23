
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const alerts = [
  { message: "High server load detected", time: "2 hours ago", level: "danger", color: "bg-red-500" },
  { message: "Database backup completed", time: "6 hours ago", level: "warning", color: "bg-yellow-500" },
  { message: "System update deployed", time: "1 day ago", level: "success", color: "bg-green-500" },
];

const RecentAlertsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent System Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className={`w-2 h-2 ${alert.color} rounded-full mt-1.5`}></div>
              <div>
                <p className="text-sm font-medium text-gray-800">{alert.message}</p>
                <p className="text-xs text-gray-500">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
export default RecentAlertsCard;
