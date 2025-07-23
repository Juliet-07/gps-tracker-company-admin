
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, Info, X, Mail, ArrowRight, Building, ChartLine } from "lucide-react";
import CompanyStatsCard from "@/components/CompanyStatsCard";
import QuickActionCard from "@/components/QuickActionCard";
import CompaniesTable from "@/components/CompaniesTable";
import { Link } from "react-router-dom";

const CompaniesPage = () => {
  return (
    <main className="p-4 md:p-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Company Management</h1>
          <p className="text-gray-600">Saturday, 15 Jun, 2025</p>
        </div>
        <Button asChild>
          <Link to="/companies/add">
            <Plus className="mr-2 h-4 w-4" />
            <span>Add Company</span>
          </Link>
        </Button>
      </div>

      {/* Demo Alert */}
      <Alert className="bg-blue-50 border-blue-200 text-blue-700 mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Info className="h-5 w-5 text-blue-500" />
          <AlertDescription className="ml-3">
            This is demo user some features are disabled.
          </AlertDescription>
        </div>
        <Button variant="ghost" size="icon" className="text-blue-500 hover:text-blue-700 h-6 w-6 shrink-0">
          <X className="h-4 w-4" />
        </Button>
      </Alert>

      {/* Email Verification */}
      <Alert className="bg-gray-100 border-gray-200 mb-6 flex items-center justify-between">
        <div className="flex items-center">
            <Mail className="h-5 w-5 text-gray-600" />
            <AlertDescription className="text-gray-700 ml-3">
              Kindly verify your email Id.
            </AlertDescription>
        </div>
        <Button size="sm">Verify</Button>
      </Alert>

      {/* Company Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <CompanyStatsCard title="All Companies" value="24" barText="Total Companies" barColor="bg-primary" />
        <CompanyStatsCard title="Currently" value="18" barText="75% Active" barColor="bg-success" />
        <CompanyStatsCard title="Currently" value="4" barText="17% Inactive" barColor="bg-warning" />
        <CompanyStatsCard title="Currently" value="2" barText="8% Suspended" barColor="bg-danger" />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <QuickActionCard
            title="Manage Companies"
            description="View, create, update, delete company profiles. Assign admins and manage permissions for each organization."
            buttonText="View All Companies"
            buttonIcon={ArrowRight}
            titleIcon={Building}
            imageUrl="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&q=80"
        />
        <QuickActionCard
            title="Company Reports"
            description="Generate detailed reports for each company including device usage, admin activities, and performance metrics."
            buttonText="Generate Reports"
            buttonIcon={ArrowRight}
            titleIcon={ChartLine}
            imageUrl="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&q=80"
        />
      </div>

      {/* Companies Table */}
      <CompaniesTable />
    </main>
  );
};

export default CompaniesPage;
