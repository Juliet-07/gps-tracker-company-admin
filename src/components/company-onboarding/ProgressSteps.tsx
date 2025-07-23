
import { cn } from "@/lib/utils";

const Step = ({ number, title, active }: { number: number; title: string; active: boolean; }) => (
    <div className="flex items-center">
        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors", active ? "bg-primary text-white" : "bg-gray-300 text-gray-600")}>
            {number}
        </div>
        <span className={cn("ml-2 font-medium transition-colors", active ? "text-primary" : "text-gray-600")}>{title}</span>
    </div>
);

const ProgressSteps = ({ currentStep }: { currentStep: number }) => {
    return (
        <div className="mb-8">
            <div className="flex items-center justify-center">
                <Step number={1} title="Company Info" active={currentStep >= 1} />
                <div className={cn("w-16 h-1 mx-4 rounded-full transition-colors", currentStep > 1 ? "bg-primary" : "bg-gray-300")} />
                <Step number={2} title="Admin Setup" active={currentStep >= 2} />
                <div className={cn("w-16 h-1 mx-4 rounded-full transition-colors", currentStep > 2 ? "bg-primary" : "bg-gray-300")} />
                <Step number={3} title="Confirmation" active={currentStep >= 3} />
            </div>
        </div>
    );
};

export default ProgressSteps;
