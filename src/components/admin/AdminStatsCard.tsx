
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminStatsCardProps {
  title: string;
  value: string;
  Icon: LucideIcon;
  description: React.ReactNode;
  iconWrapperClassName: string;
}

export const AdminStatsCard = ({ title, value, Icon, description, iconWrapperClassName }: AdminStatsCardProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-600 text-sm">{title}</p>
                <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
            </div>
            <div className={cn("p-3 rounded-lg", iconWrapperClassName)}>
                <Icon size={20} />
            </div>
        </div>
        <div className="mt-4 text-sm">
            {description}
        </div>
    </div>
  );
};
