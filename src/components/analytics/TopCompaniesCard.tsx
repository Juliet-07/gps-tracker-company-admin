
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const companies = [
  { name: "Tech Corp", industry: "Technology", devices: 342, initials: "TC", color: "bg-blue-100", textColor: "text-blue-600" },
  { name: "Global Logistics", industry: "Logistics", devices: 289, initials: "GL", color: "bg-green-100", textColor: "text-green-600" },
  { name: "Metro Transport", industry: "Transportation", devices: 156, initials: "MT", color: "bg-purple-100", textColor: "text-purple-600" },
];

const TopCompaniesCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Companies by Devices</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {companies.map((company) => (
            <div key={company.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className={`${company.color} ${company.textColor} font-semibold text-sm`}>{company.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-800">{company.name}</p>
                  <p className="text-sm text-gray-500">{company.industry}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-800">{company.devices}</p>
                <p className="text-sm text-gray-500">devices</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
export default TopCompaniesCard;
