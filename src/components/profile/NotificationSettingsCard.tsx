
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const NotificationSettingsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
            <p className="text-sm text-muted-foreground">Receive updates about system activities</p>
          </div>
          <Switch id="email-notifications" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="sms-notifications" className="font-medium">SMS Notifications</Label>
            <p className="text-sm text-muted-foreground">Critical alerts and security updates</p>
          </div>
          <Switch id="sms-notifications" />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="push-notifications" className="font-medium">Push Notifications</Label>
            <p className="text-sm text-muted-foreground">Browser notifications for real-time updates</p>
          </div>
          <Switch id="push-notifications" defaultChecked />
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettingsCard;
