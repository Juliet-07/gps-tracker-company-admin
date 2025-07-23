
import { Card, CardContent } from "@/components/ui/card";
import { Building } from "lucide-react";
import { cn } from "@/lib/utils";

type CompanyStatsCardProps = {
  title: string;
  value: string;
  barText: string;
  barColor: string;
};

const CompanyStatsCard = ({ title, value, barText, barColor }: CompanyStatsCardProps) => {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <Building className="h-10 w-10 text-gray-400" />
          <div className="flex-1">
            <p className="text-gray-600 text-sm">{title}</p>
            <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
          </div>
        </div>
        <div className={cn("mt-4 text-white text-center py-2 rounded text-sm font-semibold", barColor)}>
          {barText}
        </div>
      </CardContent>
    </Card>
  );
};
export default CompanyStatsCard;
