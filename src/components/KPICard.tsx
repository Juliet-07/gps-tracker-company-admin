
import { icons } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type KPICardProps = {
  title: string;
  value: string;
  percentage: string;
  timeframe: string;
  icon: keyof typeof icons;
  iconBgColor: string;
  iconColor: string;
};

const KPICard = ({ title, value, percentage, timeframe, icon, iconBgColor, iconColor }: KPICardProps) => {
  const LucideIcon = icons[icon];
  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">{title}</p>
            <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
          </div>
          <div className={cn("p-3 rounded-lg", iconBgColor)}>
            <LucideIcon className={cn("h-6 w-6", iconColor)} />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <span className="text-green-600">{percentage}</span>
          <span className="text-gray-600 ml-2">{timeframe}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default KPICard;
