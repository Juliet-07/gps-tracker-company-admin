
import { Button } from "@/components/ui/button";
import { Save, User, Shield, Bell, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const Settings = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
          <p className="text-gray-600">Manage your account and application preferences</p>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <nav className="space-y-2">
            <Link to="/settings/profile" className="flex items-center px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-700 rounded-lg">
              <User className="mr-3 h-5 w-5" />
              Profile Settings
            </Link>
            <a href="#security" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Shield className="mr-3 h-5 w-5" />
              Security
            </a>
            <Link to="/settings/notifications" className="flex items-center px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-700 rounded-lg">
              <Bell className="mr-3 h-5 w-5" />
              Notifications
            </Link>
            <a href="#preferences" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Globe className="mr-3 h-5 w-5" />
              Preferences
            </a>
          </nav>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Profile Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-6">
                <img 
                  src="https://i.pravatar.cc/80?u=admin" 
                  alt="Profile" 
                  className="w-20 h-20 rounded-full border-4 border-gray-200"
                />
                <div>
                  <Button variant="outline" className="mr-3">Change Photo</Button>
                  <Button variant="ghost">Remove</Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input 
                    type="text" 
                    defaultValue="Admin"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    defaultValue="User"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    defaultValue="admin@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    defaultValue="+1 (555) 123-4567"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>UTC-5 (Eastern Time)</option>
                    <option>UTC-6 (Central Time)</option>
                    <option>UTC-7 (Mountain Time)</option>
                    <option>UTC-8 (Pacific Time)</option>
                  </select>
                </div>
              </div>

              <div className="pt-6 border-t">
                <Button className="w-full md:w-auto">
                  <Save className="mr-2 h-4 w-4" />
                  Update Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
