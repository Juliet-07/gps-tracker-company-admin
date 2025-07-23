
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Gauge, Users, Smartphone, BarChart, MapPin, Settings } from "lucide-react";

const PermissionItem = ({ icon: Icon, label, checked }: { icon: React.ElementType, label: string, checked?: boolean }) => (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
        <div className="flex items-center space-x-3">
            <Icon className="text-primary" />
            <span className="font-medium">{label}</span>
        </div>
        <Switch defaultChecked={checked} />
    </div>
);

const Step3Permissions = () => {
    const permissions = [
        { icon: Gauge, label: "Dashboard", checked: true },
        { icon: Users, label: "User Management", checked: true },
        { icon: Smartphone, label: "Device Management", checked: true },
        { icon: BarChart, label: "Reports", checked: true },
        { icon: MapPin, label: "Geofences", checked: false },
        { icon: Settings, label: "Settings", checked: false },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h4 className="font-medium text-gray-800 mb-4">Module Permissions</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        {permissions.slice(0, 3).map(p => <PermissionItem key={p.label} {...p} />)}
                    </div>
                    <div className="space-y-4">
                        {permissions.slice(3, 6).map(p => <PermissionItem key={p.label} {...p} />)}
                    </div>
                </div>
            </div>
            <div>
                <h4 className="font-medium text-gray-800 mb-4">Invitation Settings</h4>
                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <Checkbox id="send-welcome" defaultChecked />
                        <Label htmlFor="send-welcome" className="font-normal">Send welcome email immediately</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Checkbox id="require-password-reset" />
                        <Label htmlFor="require-password-reset" className="font-normal">Require password reset on first login</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Checkbox id="send-sms" />
                        <Label htmlFor="send-sms" className="font-normal">Send SMS notification</Label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step3Permissions;
