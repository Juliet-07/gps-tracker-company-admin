
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Shield, 
  Bell, 
  Settings,
  Camera,
  Car,
  Users,
  BarChart3,
  AlertTriangle,
  ArrowLeft
} from "lucide-react";

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal");
  const [firstName, setFirstName] = useState("MOVE");
  const [lastName, setLastName] = useState("Admin");
  const [email, setEmail] = useState("move@ekaze.com");
  const [phone, setPhone] = useState("+1 234 567 8900");
  const [company, setCompany] = useState("eKaze GPS Solutions");
  const [role, setRole] = useState("Administrator");
  const [timezone, setTimezone] = useState("UTC-05:00 Eastern Time");
  const [address, setAddress] = useState("123 Main Street, New York, NY 10001");

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "preferences", label: "Preferences", icon: Settings },
  ];

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
              <h1 className="text-2xl font-semibold text-gray-800">Profile Settings</h1>
              <p className="text-gray-600 text-sm">Manage profile details and preferences</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <img 
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" 
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-4 border-gray-200"
                  />
                  <Button 
                    size="icon"
                    className="absolute bottom-0 right-0 rounded-full w-8 h-8"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">MOVE</h2>
                  <p className="text-gray-600">Administrator</p>
                  <div className="flex items-center mt-2 space-x-4">
                    <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
                    <span className="text-gray-500 text-sm">Last login: 14 Jun, 2025</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-2 border-b-2 font-medium flex items-center ${
                        activeTab === tab.id
                          ? "border-primary text-primary"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            <CardContent className="p-6">
              {activeTab === "personal" && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">Personal Information</h3>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2">First Name</Label>
                      <Input 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2">Last Name</Label>
                      <Input 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2">Email Address</Label>
                      <Input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <div className="flex items-center mt-2">
                        <AlertTriangle className="text-yellow-500 mr-2 h-4 w-4" />
                        <span className="text-sm text-yellow-600">Email not verified</span>
                        <Button variant="link" className="ml-2 p-0 h-auto text-sm">
                          Verify now
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2">Phone Number</Label>
                      <Input 
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2">Company</Label>
                      <Input 
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2">Role</Label>
                      <Select value={role} onValueChange={setRole}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Administrator">Administrator</SelectItem>
                          <SelectItem value="Manager">Manager</SelectItem>
                          <SelectItem value="User">User</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="col-span-2">
                      <Label className="text-sm font-medium text-gray-700 mb-2">Timezone</Label>
                      <Select value={timezone} onValueChange={setTimezone}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UTC-05:00 Eastern Time">UTC-05:00 Eastern Time</SelectItem>
                          <SelectItem value="UTC-08:00 Pacific Time">UTC-08:00 Pacific Time</SelectItem>
                          <SelectItem value="UTC+00:00 GMT">UTC+00:00 GMT</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="col-span-2">
                      <Label className="text-sm font-medium text-gray-700 mb-2">Address</Label>
                      <Textarea 
                        rows={3}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your address"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                    <Button variant="outline">
                      Cancel
                    </Button>
                    <Button>
                      Save Changes
                    </Button>
                  </div>
                </div>
              )}

              {activeTab !== "personal" && (
                <div className="text-center py-12">
                  <p className="text-gray-500">Content for {tabs.find(t => t.id === activeTab)?.label} tab coming soon...</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-3 gap-6 mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Devices Managed</p>
                    <p className="text-2xl font-bold text-gray-800">0</p>
                  </div>
                  <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
                    <Car className="text-primary h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Users Created</p>
                    <p className="text-2xl font-bold text-gray-800">5</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500 bg-opacity-10 rounded-lg flex items-center justify-center">
                    <Users className="text-green-500 h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Reports Generated</p>
                    <p className="text-2xl font-bold text-gray-800">23</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-500 bg-opacity-10 rounded-lg flex items-center justify-center">
                    <BarChart3 className="text-yellow-500 h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileSettings;
