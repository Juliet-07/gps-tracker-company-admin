
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { 
  Save, 
  Shapes, 
  Gauge, 
  Power, 
  Wrench,
  Mail,
  MessageSquare,
  Bell,
  ArrowLeft
} from "lucide-react";

const NotificationSettings = () => {
  const navigate = useNavigate();
  const [geofenceEnabled, setGeofenceEnabled] = useState(true);
  const [speedEnabled, setSpeedEnabled] = useState(true);
  const [engineEnabled, setEngineEnabled] = useState(true);
  const [maintenanceEnabled, setMaintenanceEnabled] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(true);
  
  const [speedLimit, setSpeedLimit] = useState(80);
  const [duration, setDuration] = useState(10);
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("18:00");
  
  const [activeDays, setActiveDays] = useState([
    "Mon", "Tue", "Wed", "Thu", "Fri"
  ]);

  const toggleDay = (day: string) => {
    setActiveDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  return (
    <div className="flex-1 flex flex-col">
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate("/settings")}
              className="hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Notification Settings</h1>
              <p className="text-gray-600 text-sm">Configure alerts for geofences, overspeed, and other notifications</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-4xl">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl">Alert Types</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Geofence Alerts */}
              <div className="border-b border-gray-200 pb-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <Shapes className="text-primary mr-3 h-5 w-5" />
                      <h3 className="text-lg font-medium text-gray-800">Geofence Alerts</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">Get notified when vehicles enter or exit geofenced areas</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="entry" defaultChecked />
                        <Label htmlFor="entry">Entry notifications</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="exit" defaultChecked />
                        <Label htmlFor="exit">Exit notifications</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="dwell" />
                        <Label htmlFor="dwell">Dwell time alerts</Label>
                      </div>
                    </div>
                  </div>
                  <div className="ml-6">
                    <Switch 
                      checked={geofenceEnabled} 
                      onCheckedChange={setGeofenceEnabled}
                    />
                  </div>
                </div>
              </div>

              {/* Speed Alerts */}
              <div className="border-b border-gray-200 pb-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <Gauge className="text-red-500 mr-3 h-5 w-5" />
                      <h3 className="text-lg font-medium text-gray-800">Overspeed Alerts</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">Monitor vehicle speed violations and get instant alerts</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2">Speed Limit (km/h)</Label>
                        <Input 
                          type="number" 
                          value={speedLimit}
                          onChange={(e) => setSpeedLimit(Number(e.target.value))}
                          placeholder="Enter speed limit"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2">Duration (seconds)</Label>
                        <Input 
                          type="number" 
                          value={duration}
                          onChange={(e) => setDuration(Number(e.target.value))}
                          placeholder="Alert after"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="ml-6">
                    <Switch 
                      checked={speedEnabled} 
                      onCheckedChange={setSpeedEnabled}
                    />
                  </div>
                </div>
              </div>

              {/* Engine Alerts */}
              <div className="border-b border-gray-200 pb-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <Power className="text-yellow-500 mr-3 h-5 w-5" />
                      <h3 className="text-lg font-medium text-gray-800">Engine Status Alerts</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">Get notified about engine on/off events</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="engine-start" defaultChecked />
                        <Label htmlFor="engine-start">Engine start notifications</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="engine-stop" defaultChecked />
                        <Label htmlFor="engine-stop">Engine stop notifications</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="idle" />
                        <Label htmlFor="idle">Long idle alerts</Label>
                      </div>
                    </div>
                  </div>
                  <div className="ml-6">
                    <Switch 
                      checked={engineEnabled} 
                      onCheckedChange={setEngineEnabled}
                    />
                  </div>
                </div>
              </div>

              {/* Maintenance Alerts */}
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <Wrench className="text-green-500 mr-3 h-5 w-5" />
                      <h3 className="text-lg font-medium text-gray-800">Maintenance Alerts</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">Reminders for scheduled maintenance and service</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="service-due" defaultChecked />
                        <Label htmlFor="service-due">Service due alerts</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="mileage" />
                        <Label htmlFor="mileage">Mileage-based reminders</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="time-based" />
                        <Label htmlFor="time-based">Time-based reminders</Label>
                      </div>
                    </div>
                  </div>
                  <div className="ml-6">
                    <Switch 
                      checked={maintenanceEnabled} 
                      onCheckedChange={setMaintenanceEnabled}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl">Notification Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <Mail className="text-primary text-2xl mb-3 mx-auto h-8 w-8" />
                  <h3 className="font-medium text-gray-800 mb-2">Email</h3>
                  <Switch 
                    checked={emailEnabled} 
                    onCheckedChange={setEmailEnabled}
                  />
                </div>
                
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <MessageSquare className="text-primary text-2xl mb-3 mx-auto h-8 w-8" />
                  <h3 className="font-medium text-gray-800 mb-2">SMS</h3>
                  <Switch 
                    checked={smsEnabled} 
                    onCheckedChange={setSmsEnabled}
                  />
                </div>
                
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <Bell className="text-primary text-2xl mb-3 mx-auto h-8 w-8" />
                  <h3 className="font-medium text-gray-800 mb-2">Push</h3>
                  <Switch 
                    checked={pushEnabled} 
                    onCheckedChange={setPushEnabled}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl">Notification Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">Active Hours</Label>
                  <div className="flex space-x-2 items-center">
                    <Input 
                      type="time" 
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="flex-1"
                    />
                    <span className="text-gray-500">to</span>
                    <Input 
                      type="time" 
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">Active Days</Label>
                  <div className="flex space-x-1">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <Button
                        key={day}
                        size="sm"
                        variant={activeDays.includes(day) ? "default" : "outline"}
                        onClick={() => toggleDay(day)}
                        className="px-3 py-2 text-xs"
                      >
                        {day}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button variant="outline">
              Cancel
            </Button>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotificationSettings;
