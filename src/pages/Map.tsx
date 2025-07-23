import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Search,
  Filter,
  Plus,
  Expand,
  Layers,
  Crosshair,
  Car,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddDeviceForm } from "@/components/AddDeviceForm";

// Declare Leaflet types for TypeScript
declare global {
  interface Window {
    L: any;
  }
}

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [activeTab, setActiveTab] = useState<"all" | "online" | "offline">(
    "all"
  );
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);

  // Mock device data - in real app this would come from API
  const [devices, setDevices] = useState([
    {
      id: 1,
      name: "Vehicle 001",
      status: "online",
      lat: 40.7128,
      lng: -74.006,
    },
    {
      id: 2,
      name: "Vehicle 002",
      status: "offline",
      lat: 40.7589,
      lng: -73.9851,
    },
    {
      id: 3,
      name: "Vehicle 003",
      status: "online",
      lat: 40.6892,
      lng: -74.0445,
    },
  ]);

  const onlineDevices = devices.filter((d) => d.status === "online");
  const offlineDevices = devices.filter((d) => d.status === "offline");

  const handleAddDevice = (deviceData: any) => {
    const newDevice = {
      id: devices.length + 1,
      name: deviceData.name,
      status: "online",
      lat: deviceData.lat,
      lng: deviceData.lng,
    };

    setDevices((prev) => [...prev, newDevice]);

    // Add marker to map if map is initialized
    if (mapInstanceRef.current && window.L) {
      const customIcon = window.L.divIcon({
        className: "custom-marker",
        html: `<div style="background-color: #22c55e; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      window.L.marker([newDevice.lat, newDevice.lng], { icon: customIcon })
        .addTo(mapInstanceRef.current)
        .bindPopup(`${newDevice.name} (${newDevice.status})`);
    }

    setIsAddDeviceOpen(false);
  };

  const getFilteredDevices = () => {
    switch (activeTab) {
      case "online":
        return onlineDevices;
      case "offline":
        return offlineDevices;
      default:
        return devices;
    }
  };

  const getTabButtonClass = (tab: string) => {
    return activeTab === tab
      ? "flex-1 px-3 py-2 text-sm font-medium text-white bg-primary rounded-md"
      : "flex-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-800";
  };

  useEffect(() => {
    // Load Leaflet CSS and JS
    const loadLeaflet = async () => {
      // Add Leaflet CSS
      if (!document.querySelector('link[href*="leaflet"]')) {
        const leafletCSS = document.createElement("link");
        leafletCSS.rel = "stylesheet";
        leafletCSS.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        leafletCSS.integrity =
          "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
        leafletCSS.crossOrigin = "";
        document.head.appendChild(leafletCSS);
      }

      // Add Leaflet JS
      if (!window.L) {
        return new Promise((resolve) => {
          const leafletJS = document.createElement("script");
          leafletJS.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
          leafletJS.integrity =
            "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
          leafletJS.crossOrigin = "";
          leafletJS.onload = resolve;
          document.head.appendChild(leafletJS);
        });
      }
    };

    const initializeMap = async () => {
      await loadLeaflet();

      if (mapRef.current && window.L && !mapInstanceRef.current) {
        // Initialize map
        mapInstanceRef.current = window.L.map(mapRef.current).setView(
          [40.7128, -74.006],
          10
        );

        // Add tile layer
        window.L.tileLayer(
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
            attribution: "© OpenStreetMap contributors",
          }
        ).addTo(mapInstanceRef.current);

        // Add markers for devices
        devices.forEach((device) => {
          const customIcon = window.L.divIcon({
            className: "custom-marker",
            html: `<div style="background-color: ${
              device.status === "online" ? "#22c55e" : "#6b7280"
            }; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8],
          });

          window.L.marker([device.lat, device.lng], { icon: customIcon })
            .addTo(mapInstanceRef.current)
            .bindPopup(`${device.name} (${device.status})`);
        });

        // Invalidate size after a short delay to ensure proper rendering
        setTimeout(() => {
          if (mapInstanceRef.current) {
            mapInstanceRef.current.invalidateSize();
          }
        }, 100);
      }
    };

    initializeMap();

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current && window.L) {
      // Clear existing markers
      mapInstanceRef.current.eachLayer((layer: any) => {
        if (layer.options && layer.options.icon) {
          mapInstanceRef.current.removeLayer(layer);
        }
      });

      // Add markers for all devices
      devices.forEach((device) => {
        const customIcon = window.L.divIcon({
          className: "custom-marker",
          html: `<div style="background-color: ${
            device.status === "online" ? "#22c55e" : "#6b7280"
          }; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        });

        window.L.marker([device.lat, device.lng], { icon: customIcon })
          .addTo(mapInstanceRef.current)
          .bindPopup(`${device.name} (${device.status})`);
      });
    }
  }, [devices]);

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="p-6 pb-2">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Live Map View</h1>
            <p className="text-gray-600 mt-1">
              Track and monitor devices in real-time
            </p>
          </div>
        </div>
      </div>

      <main className="flex-1 px-6 pb-6 min-h-0">
        <div className="flex flex-col md:flex-row h-full bg-white rounded-lg shadow-sm overflow-hidden">
          {/* FILTER VIEW */}
          <div className="md:w-80 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Devices</h3>
                <div className="flex space-x-2">
                  <Dialog
                    open={isAddDeviceOpen}
                    onOpenChange={setIsAddDeviceOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add New Device</DialogTitle>
                      </DialogHeader>
                      <AddDeviceForm onSubmit={handleAddDevice} />
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  className={getTabButtonClass("all")}
                  onClick={() => setActiveTab("all")}
                >
                  All ({devices.length})
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={getTabButtonClass("online")}
                  onClick={() => setActiveTab("online")}
                >
                  Online ({onlineDevices.length})
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={getTabButtonClass("offline")}
                  onClick={() => setActiveTab("offline")}
                >
                  Offline ({offlineDevices.length})
                </Button>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="moving"
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label
                    htmlFor="moving"
                    className="text-sm text-gray-700 flex items-center"
                  >
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    Moving (0)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="idle"
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label
                    htmlFor="idle"
                    className="text-sm text-gray-700 flex items-center"
                  >
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    Idle (0)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="stopped"
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label
                    htmlFor="stopped"
                    className="text-sm text-gray-700 flex items-center"
                  >
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    Stopped (0)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="offline"
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label
                    htmlFor="offline"
                    className="text-sm text-gray-700 flex items-center"
                  >
                    <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                    Offline ({offlineDevices.length})
                  </label>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {getFilteredDevices().length > 0 ? (
                <div className="p-4 space-y-3">
                  {getFilteredDevices().map((device) => (
                    <div
                      key={device.id}
                      className="bg-gray-50 p-3 rounded-lg border hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div
                            className={`w-3 h-3 rounded-full mr-3 ${
                              device.status === "online"
                                ? "bg-green-500"
                                : "bg-gray-400"
                            }`}
                          ></div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">
                              {device.name}
                            </h4>
                            <p className="text-xs text-gray-500 capitalize">
                              {device.status}
                            </p>
                          </div>
                        </div>
                        <Car className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  <Car className="h-16 w-16 mb-4 text-gray-300 mx-auto" />
                  <p className="text-sm">No {activeTab} devices found</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {activeTab === "all"
                      ? "Add devices to view them on the map"
                      : `No devices are currently ${activeTab}`}
                  </p>
                </div>
              )}
            </div>
          </div>
          {/* MAIN MAP VIEW */}
          <div className="flex-1 relative">
            <div ref={mapRef} className="w-full h-full z-0"></div>

            <div className="absolute top-4 right-4 space-y-2 z-10">
              <Button
                variant="outline"
                size="sm"
                className="bg-white shadow-lg p-3 hover:bg-gray-50"
              >
                <Expand className="h-4 w-4 text-gray-600" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-white shadow-lg p-3 hover:bg-gray-50"
              >
                <Layers className="h-4 w-4 text-gray-600" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-white shadow-lg p-3 hover:bg-gray-50"
              >
                <Crosshair className="h-4 w-4 text-gray-600" />
              </Button>
            </div>

            <div className="absolute bottom-4 left-4 bg-white shadow-lg p-4 rounded-lg z-10">
              <h4 className="text-sm font-semibold text-gray-800 mb-3">
                Legend
              </h4>
              <div className="space-y-2">
                <div className="flex items-center text-xs">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">Moving</span>
                </div>
                <div className="flex items-center text-xs">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">Idle</span>
                </div>
                <div className="flex items-center text-xs">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">Stopped</span>
                </div>
                <div className="flex items-center text-xs">
                  <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                  <span className="text-gray-600">Offline</span>
                </div>
              </div>
            </div>

            <div className="absolute top-4 left-4 bg-white shadow-lg p-4 rounded-lg z-10">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                  <span className="text-gray-600">
                    Online: {onlineDevices.length}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mr-1"></div>
                  <span className="text-gray-600">
                    Offline: {offlineDevices.length}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></div>
                  <span className="text-gray-600">Moving: 0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Map;
