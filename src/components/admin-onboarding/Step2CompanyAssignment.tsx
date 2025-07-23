
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Step2CompanyAssignment = () => (
    <div className="space-y-6">
        <div>
            <Label htmlFor="company" className="mb-2 block">Select Company <span className="text-red-500">*</span></Label>
            <Select>
                <SelectTrigger id="company">
                    <SelectValue placeholder="Choose a company to assign admin" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="tech-corp">Tech Corp - Technology Solutions</SelectItem>
                    <SelectItem value="global-logistics">Global Logistics - Supply Chain Management</SelectItem>
                    <SelectItem value="metro-transport">Metro Transport - Public Transportation</SelectItem>
                    <SelectItem value="swift-delivery">Swift Delivery - Courier Services</SelectItem>
                    <SelectItem value="green-fleet">Green Fleet - Eco-Friendly Transport</SelectItem>
                </SelectContent>
            </Select>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-medium text-gray-800 mb-4">Company Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                    <span className="text-gray-600">Industry:</span>
                    <span className="ml-2 font-medium">Technology Solutions</span>
                </div>
                <div>
                    <span className="text-gray-600">Devices:</span>
                    <span className="ml-2 font-medium">245 Active</span>
                </div>
                <div>
                    <span className="text-gray-600">Current Admins:</span>
                    <span className="ml-2 font-medium">3 Admins</span>
                </div>
                <div>
                    <span className="text-gray-600">Status:</span>
                    <span className="ml-2 font-medium text-green-600">Active</span>
                </div>
            </div>
        </div>

        <div>
            <Label className="mb-2 block">Admin Level</Label>
            <RadioGroup defaultValue="full" className="space-y-3 mt-2">
                <div className="flex items-start space-x-3">
                    <RadioGroupItem value="full" id="full" className="mt-1"/>
                    <Label htmlFor="full" className="font-normal -mt-1">
                        <span className="font-medium text-gray-900 block">Full Admin Access</span>
                        <span className="text-sm text-gray-500">Complete access to all company features and settings</span>
                    </Label>
                </div>
                <div className="flex items-start space-x-3">
                    <RadioGroupItem value="limited" id="limited" className="mt-1" />
                    <Label htmlFor="limited" className="font-normal -mt-1">
                        <span className="font-medium text-gray-900 block">Limited Admin Access</span>
                        <span className="text-sm text-gray-500">Access to specific modules only (customizable)</span>
                    </Label>
                </div>
            </RadioGroup>
        </div>
    </div>
);

export default Step2CompanyAssignment;
