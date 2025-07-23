
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Building, Truck, Bus } from "lucide-react";

const companies = [
  { name: "Tech Corp", industry: "Technology", icon: Building, iconColor: "text-blue-600", iconBg: "bg-blue-100", devices: 342, users: 45, activity: 92, status: "Active", growth: "+15%" },
  { name: "Global Logistics", industry: "Logistics", icon: Truck, iconColor: "text-green-600", iconBg: "bg-green-100", devices: 289, users: 38, activity: 88, status: "Active", growth: "+8%" },
  { name: "Metro Transport", industry: "Transportation", icon: Bus, iconColor: "text-purple-600", iconBg: "bg-purple-100", devices: 156, users: 22, activity: 74, status: "Active", growth: "+5%" },
];

const PerformanceTable = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Performance Overview</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap">Company</TableHead>
              <TableHead className="whitespace-nowrap">Devices</TableHead>
              <TableHead className="whitespace-nowrap">Users</TableHead>
              <TableHead className="whitespace-nowrap">Activity</TableHead>
              <TableHead className="whitespace-nowrap">Status</TableHead>
              <TableHead className="whitespace-nowrap">Growth</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((company) => {
                const Icon = company.icon;
                return (
                    <TableRow key={company.name}>
                        <TableCell>
                            <div className="flex items-center">
                                <div className={`w-10 h-10 ${company.iconBg} rounded-lg flex items-center justify-center shrink-0`}>
                                    <Icon className={`h-5 w-5 ${company.iconColor}`} />
                                </div>
                                <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{company.name}</div>
                                    <div className="text-sm text-gray-500">{company.industry}</div>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-900">{company.devices}</TableCell>
                        <TableCell className="text-sm text-gray-900">{company.users}</TableCell>
                        <TableCell>
                            <div className="flex items-center">
                                <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                    <div className="bg-green-600 h-2 rounded-full" style={{ width: `${company.activity}%` }}></div>
                                </div>
                                <span className="text-sm text-gray-600">{company.activity}%</span>
                            </div>
                        </TableCell>
                        <TableCell>
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">{company.status}</span>
                        </TableCell>
                        <TableCell className="text-sm text-green-600 font-medium">{company.growth}</TableCell>
                    </TableRow>
                )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PerformanceTable;
