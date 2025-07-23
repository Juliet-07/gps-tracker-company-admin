
import { cn } from "@/lib/utils";
import React from "react";

const Step = ({ number, title, active }: { number: number; title: string; active: boolean; }) => (
    <div className="flex items-center space-x-2">
        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors", active ? "bg-primary text-white" : "bg-gray-200 text-gray-500")}>
            {number}
        </div>
        <span className={cn("font-medium transition-colors", active ? "text-primary" : "text-gray-500")}>{title}</span>
    </div>
);

const AdminOnboardingProgress = ({ currentStep }: { currentStep: number }) => {
    const steps = [
        { number: 1, title: "Admin Details" },
        { number: 2, title: "Company Assignment" },
        { number: 3, title: "Permissions" },
    ];
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
                {steps.map((step, index) => (
                    <React.Fragment key={step.number}>
                        <Step number={step.number} title={step.title} active={currentStep >= step.number} />
                        {index < steps.length - 1 && <div className="w-12 h-px bg-gray-300" />}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default AdminOnboardingProgress;
