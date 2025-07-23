
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Eye, Edit, Trash, Building } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Card } from "./ui/card";

const companies = [
  {
    name: 'TechCorp Solutions',
    email: 'techcorp@example.com',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    admin: {
      name: 'John Smith',
      role: 'Admin',
      avatar: 'https://i.pravatar.cc/40?u=johnsmith',
    },
    devices: 125,
    status: 'Active',
    created: 'Jan 15, 2025',
  },
  {
    name: 'LogiTrans Ltd',
    email: 'logistics@logitrans.com',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    admin: {
      name: 'Sarah Johnson',
      role: 'Admin',
      avatar: 'https://i.pravatar.cc/40?u=sarahjohnson',
    },
    devices: 89,
    status: 'Active',
    created: 'Feb 3, 2025',
  },
  {
    name: 'FleetMaster Inc',
    email: 'contact@fleetmaster.com',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    admin: {
      name: 'Mike Davis',
      role: 'Admin',
      avatar: 'https://i.pravatar.cc/40?u=mikedavis',
    },
    devices: 67,
    status: 'Inactive',
    created: 'Mar 12, 2025',
  },
  {
    name: 'CargoFlow Systems',
    email: 'admin@cargoflow.com',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    admin: {
      name: 'Alex Brown',
      role: 'Admin',
      avatar: 'https://i.pravatar.cc/40?u=alexbrown',
    },
    devices: 43,
    status: 'Suspended',
    created: 'Apr 8, 2025',
  },
];

const statusVariantMap: { [key: string]: string } = {
    Active: 'bg-green-100 text-green-800 hover:bg-green-100/80',
    Inactive: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80',
    Suspended: 'bg-red-100 text-red-800 hover:bg-red-100/80',
};


const CompaniesTable = () => {
    return (
        <Card className="shadow-sm">
            <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">Recent Companies</h3>
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            <Input type="text" placeholder="Search companies..." className="pl-10 w-64" />
                        </div>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="All Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                                <SelectItem value="suspended">Suspended</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Company</TableHead>
                            <TableHead>Admin</TableHead>
                            <TableHead>Devices</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {companies.map((company) => (
                            <TableRow key={company.name}>
                                <TableCell>
                                    <div className="flex items-center">
                                        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", company.iconBg)}>
                                            <Building className={cn("h-5 w-5", company.iconColor)} />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{company.name}</div>
                                            <div className="text-sm text-gray-500">{company.email}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={company.admin.avatar} alt={company.admin.name} />
                                        </Avatar>
                                        <div className="ml-3">
                                            <div className="text-sm font-medium text-gray-900">{company.admin.name}</div>
                                            <div className="text-sm text-gray-500">{company.admin.role}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-sm text-gray-900">{company.devices}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={cn("border-transparent", statusVariantMap[company.status])}>
                                        {company.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-sm text-gray-500">{company.created}</TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-900 h-8 w-8">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-yellow-600 hover:text-yellow-900 h-8 w-8">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-900 h-8 w-8">
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Card>
    );
}

export default CompaniesTable;
