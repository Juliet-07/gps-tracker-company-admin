
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface AnalyticsKpiCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  change?: string;
  changeText?: string;
  statusText?: string;
  statusColor?: string;
}

const AnalyticsKpiCard = ({ title, value, icon: Icon, iconBgColor, iconColor, change, changeText, statusText, statusColor }: AnalyticsKpiCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">{title}</p>
            <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
          </div>
          <div className={`p-3 rounded-lg ${iconBgColor}`}>
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
        </div>
        {(change || changeText || statusText) && (
            <div className="mt-4 flex items-center text-sm">
                {change && <span className="text-green-600">{change}</span>}
                {changeText && <span className="text-gray-600 ml-2">{changeText}</span>}
                {statusText && <span className={`${statusColor || 'text-green-600'}`}>{statusText}</span>}
            </div>
        )}
      </CardContent>
    </Card>
  );
};
export default AnalyticsKpiCard;
