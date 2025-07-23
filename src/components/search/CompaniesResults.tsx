
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, ChevronRight } from "lucide-react";

const companies = [
    { name: 'TechCorp Solutions', email: 'tech@solutions.com', devices: 45, status: 'Active', iconColor: 'text-blue-600', bgColor: 'bg-blue-100' },
    { name: 'Global Logistics Ltd', email: 'contact@globallogistics.com', devices: 128, status: 'Active', iconColor: 'text-green-600', bgColor: 'bg-green-100' },
    { name: 'Metro Transport Co', email: 'admin@metrotransport.com', devices: 67, status: 'Inactive', iconColor: 'text-orange-600', bgColor: 'bg-orange-100' },
    { name: 'Swift Delivery Services', email: 'info@swiftdelivery.com', devices: 89, status: 'Active', iconColor: 'text-purple-600', bgColor: 'bg-purple-100' },
];

type Company = typeof companies[0];

const CompanyItem = ({ company }: { company: Company }) => (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
        <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 ${company.bgColor} rounded-lg flex items-center justify-center`}>
                <Building className={company.iconColor} />
            </div>
            <div>
                <h4 className="font-medium text-gray-800">{company.name}</h4>
                <p className="text-sm text-gray-600">{company.email} • {company.devices} devices</p>
            </div>
        </div>
        <div className="flex items-center space-x-2">
            <span className={`text-white text-xs px-2 py-1 rounded ${company.status === 'Active' ? 'bg-green-500' : 'bg-orange-500'}`}>{company.status}</span>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600">
                <ChevronRight />
            </Button>
        </div>
    </div>
);

const CompaniesResults = () => {
    return (
        <Card>
            <CardHeader className="p-6 flex flex-row items-center justify-between">
                <CardTitle className="flex items-center !text-lg !font-semibold">
                    <Building className="text-primary mr-2" />
                    Companies (8 results)
                </CardTitle>
                <Button variant="link" className="text-primary p-0 h-auto">View All</Button>
            </CardHeader>
            <CardContent className="p-6 pt-0">
                <div className="space-y-4">
                    {companies.map(company => <CompanyItem key={company.name} company={company} />)}
                </div>
            </CardContent>
        </Card>
    )
}
export default CompaniesResults;

