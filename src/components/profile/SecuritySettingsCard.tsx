
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Monitor, Smartphone } from "lucide-react";

const SecuritySettingsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Change Password */}
        <div>
          <h4 className="text-md font-semibold mb-4">Change Password</h4>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div>
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div>
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </div>
            <div className="mt-4">
              <Button>Update Password</Button>
            </div>
          </form>
        </div>

        <div className="border-t pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-md font-semibold">Two-Factor Authentication</h4>
              <p className="text-gray-600 text-sm">Add an extra layer of security to your account</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">Disabled</span>
              <Switch id="two-factor-switch" />
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h4 className="text-md font-semibold mb-4">Recent Login Activity</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Monitor className="text-muted-foreground" />
                <div>
                  <p className="font-medium">Desktop - Chrome</p>
                  <p className="text-sm text-muted-foreground">192.168.1.100 • New York, NY</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-green-600">Current Session</p>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Smartphone className="text-muted-foreground" />
                <div>
                  <p className="font-medium">Mobile - Safari</p>
                  <p className="text-sm text-muted-foreground">10.0.0.5 • New York, NY</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Yesterday</p>
                <Button variant="link" className="text-sm text-destructive hover:underline p-0 h-auto">Revoke</Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecuritySettingsCard;
