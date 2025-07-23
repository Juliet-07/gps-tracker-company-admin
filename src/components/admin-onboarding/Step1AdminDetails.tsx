
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

const Step1AdminDetails = () => (
    <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <Label htmlFor="firstName" className="mb-2 block">First Name <span className="text-red-500">*</span></Label>
                <Input id="firstName" placeholder="Enter first name" />
            </div>
            <div>
                <Label htmlFor="lastName" className="mb-2 block">Last Name <span className="text-red-500">*</span></Label>
                <Input id="lastName" placeholder="Enter last name" />
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <Label htmlFor="email" className="mb-2 block">Email Address <span className="text-red-500">*</span></Label>
                <Input type="email" id="email" placeholder="admin@company.com" />
            </div>
            <div>
                <Label htmlFor="phone" className="mb-2 block">Phone Number</Label>
                <Input type="tel" id="phone" placeholder="+1 (555) 123-4567" />
            </div>
        </div>
        <div>
            <Label htmlFor="jobTitle" className="mb-2 block">Job Title</Label>
            <Input id="jobTitle" placeholder="Fleet Manager, Operations Director, etc." />
        </div>
        <div>
            <Label className="mb-2 block">Profile Picture</Label>
            <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="text-gray-400" size={32} />
                </div>
                <div>
                    <Button type="button" variant="outline">Upload Photo</Button>
                    <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</p>
                </div>
            </div>
        </div>
    </div>
);

export default Step1AdminDetails;
