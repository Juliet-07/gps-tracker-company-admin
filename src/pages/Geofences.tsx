import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Search, Filter, MapPin } from "lucide-react";
import { GeofenceForm } from "@/components/GeofenceForm";

const Geofences = () => {
  const [isCreateGeofenceOpen, setIsCreateGeofenceOpen] = useState(false);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Geofences</h1>
          <p className="text-gray-600">Create and manage geographical boundaries for your vehicles</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
          <Dialog open={isCreateGeofenceOpen} onOpenChange={setIsCreateGeofenceOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Geofence
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden">
              <DialogHeader>
                <DialogTitle>Create New Geofence</DialogTitle>
              </DialogHeader>
              <GeofenceForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total Geofences</p>
              <span className="text-3xl font-bold text-gray-800">0</span>
            </div>
            <MapPin className="h-8 w-8 text-blue-500" />
          </div>
          <div className="mt-4 bg-blue-100 p-3 rounded text-center">
            <p className="text-sm font-medium text-blue-800">All Geofences</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Active</p>
              <span className="text-3xl font-bold text-gray-800">0</span>
            </div>
            <MapPin className="h-8 w-8 text-green-500" />
          </div>
          <div className="mt-4 bg-green-100 p-3 rounded text-center">
            <p className="text-sm font-medium text-green-800">Active Zones</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Violations</p>
              <span className="text-3xl font-bold text-gray-800">0</span>
            </div>
            <MapPin className="h-8 w-8 text-red-500" />
          </div>
          <div className="mt-4 bg-red-100 p-3 rounded text-center">
            <p className="text-sm font-medium text-red-800">Today's Violations</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Alerts</p>
              <span className="text-3xl font-bold text-gray-800">0</span>
            </div>
            <MapPin className="h-8 w-8 text-orange-500" />
          </div>
          <div className="mt-4 bg-orange-100 p-3 rounded text-center">
            <p className="text-sm font-medium text-orange-800">Active Alerts</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <div className="text-center py-12">
            <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Geofences Created</h3>
            <p className="text-gray-500 mb-4">Start by creating your first geofence to monitor vehicle boundaries</p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create First Geofence
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Geofences;
