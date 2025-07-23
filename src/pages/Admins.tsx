import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AdminStatsCard } from "@/components/admin/AdminStatsCard";
import { AdminsTable } from "@/components/admin/AdminsTable";
import { format } from "date-fns";
import { Plus, Info, X, Users, UserCheck, Clock, Building, Search, Filter, Download } from "lucide-react";

const AdminsPage = () => {
  const [isDemoAlertVisible, setDemoAlertVisible] = useState(true);

  return (
    <main className="p-6 bg-gray-50/50 min-h-screen">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Admin Management</h1>
          <p className="text-gray-600">Create and manage admin accounts for companies</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-gray-600 hidden sm:inline">{format(new Date(), 'dd MMM, yyyy')}</span>
          <Button asChild>
            <Link to="/admins/add">
              <Plus />
              <span>Create Admin</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Demo Alert */}
      {isDemoAlertVisible && (
        <Alert className="bg-blue-50 border-blue-200 text-blue-700 mb-6 flex items-center justify-between">
            <div className="flex items-center">
                <Info className="h-5 w-5 text-blue-500" />
                <AlertDescription className="ml-3">
                    This is demo user some features are disabled.
                </AlertDescription>
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-blue-500 hover:text-blue-700 hover:bg-transparent" onClick={() => setDemoAlertVisible(false)}>
                <X className="h-4 w-4" />
            </Button>
        </Alert>
      )}

      {/* Admin Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AdminStatsCard 
            title="Total Admins"
            value="48"
            Icon={Users}
            iconWrapperClassName="bg-blue-100 text-blue-600"
            description={
                <div className="flex items-center">
                    <span className="text-green-600">+8%</span>
                    <span className="text-gray-600 ml-2">from last month</span>
                </div>
            }
        />
        <AdminStatsCard 
            title="Active Admins"
            value="42"
            Icon={UserCheck}
            iconWrapperClassName="bg-green-100 text-green-600"
            description={<span className="text-green-600">87.5% Active</span>}
        />
        <AdminStatsCard 
            title="Pending Invites"
            value="6"
            Icon={Clock}
            iconWrapperClassName="bg-orange-100 text-orange-600"
            description={<span className="text-orange-600">12.5% Pending</span>}
        />
        <AdminStatsCard 
            title="Companies Covered"
            value="24"
            Icon={Building}
            iconWrapperClassName="bg-purple-100 text-purple-600"
            description={<span className="text-green-600">100% Coverage</span>}
        />
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input type="text" placeholder="Search admins..." className="w-full sm:w-64 pl-10" />
                </div>
                <Select>
                    <SelectTrigger className="w-full sm:w-auto">
                        <SelectValue placeholder="All Companies" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="company1">Tech Corp</SelectItem>
                        <SelectItem value="company2">Global Logistics</SelectItem>
                        <SelectItem value="company3">Metro Transport</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="w-full sm:w-auto">
                        <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex items-center space-x-2">
                <Button variant="outline">
                    <Filter/>
                    <span>Filter</span>
                </Button>
                <Button variant="outline">
                    <Download/>
                    <span>Export</span>
                </Button>
            </div>
        </div>
      </div>
      
      {/* Admins Table */}
      <AdminsTable />
    </main>
  );
};

export default AdminsPage;
