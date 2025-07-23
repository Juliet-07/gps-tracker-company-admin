
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import AdminOnboardingProgress from "@/components/admin-onboarding/AdminOnboardingProgress";
import Step1AdminDetails from "@/components/admin-onboarding/Step1AdminDetails";
import Step2CompanyAssignment from "@/components/admin-onboarding/Step2CompanyAssignment";
import Step3Permissions from "@/components/admin-onboarding/Step3Permissions";
import { ArrowLeft, ArrowRight, UserPlus } from "lucide-react";

const AddAdminPage = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep((prev) => (prev < 3 ? prev + 1 : prev));
  const prevStep = () => setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev));

  return (
    <main className="p-6 bg-gray-50/50 min-h-screen">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/admins">Admins</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Onboard Admin</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Onboarding</h1>
        <p className="text-gray-600">Complete the form below to onboard a new admin to the eKaze platform</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-8 py-6 border-b border-gray-200">
            <AdminOnboardingProgress currentStep={currentStep} />
          </div>
          
          <div className="p-8">
            {currentStep === 1 && <Step1AdminDetails />}
            {currentStep === 2 && <Step2CompanyAssignment />}
            {currentStep === 3 && <Step3Permissions />}
          </div>

          <div className="px-8 py-6 border-t border-gray-200 flex items-center justify-between">
            {currentStep > 1 ? (
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft className="mr-2" />
                Back
              </Button>
            ) : (
              <div />
            )}
            <div className="flex items-center space-x-3">
              <Button variant="outline">Save as Draft</Button>
              {currentStep < 3 ? (
                <Button onClick={nextStep}>
                  Next Step
                  <ArrowRight className="ml-2" />
                </Button>
              ) : (
                <Button className="bg-green-600 text-white hover:bg-green-700">
                  <UserPlus className="mr-2" />
                  Onboard Admin
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddAdminPage;
