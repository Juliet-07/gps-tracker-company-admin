
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ProgressSteps from "@/components/company-onboarding/ProgressSteps";
import Step1CompanyInfo from "@/components/company-onboarding/Step1CompanyInfo";
import { useState } from "react";

const AddCompanyPage = () => {
    const [currentStep, setCurrentStep] = useState(1);

    return (
        <main className="p-4 md:p-6 bg-gray-50 min-h-full">
            <div className="max-w-5xl mx-auto">
                {/* Page Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Onboard New Company</h1>
                        <p className="text-gray-600">Add a new company to the eKaze GPS tracking platform</p>
                    </div>
                    <Button variant="outline" asChild>
                        <Link to="/companies">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            <span>Back to Companies</span>
                        </Link>
                    </Button>
                </div>

                {/* Onboarding Form */}
                <div className="max-w-4xl mx-auto">
                    <ProgressSteps currentStep={currentStep} />
                    {currentStep === 1 && <Step1CompanyInfo onContinue={() => setCurrentStep(2)} />}
                    {currentStep === 2 && <div className="text-center p-8 bg-white rounded-lg shadow-sm">Admin Setup (Step 2) coming soon!</div>}
                    {currentStep === 3 && <div className="text-center p-8 bg-white rounded-lg shadow-sm">Confirmation (Step 3) coming soon!</div>}
                </div>
            </div>
        </main>
    );
};

export default AddCompanyPage;
