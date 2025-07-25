import { useState } from "react";
import axiosInstance from "@/api/axios";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  Microchip,
  Wifi,
  WifiOff,
  Wrench,
  Info,
  X,
  Filter,
  Eye,
  Edit,
  Trash,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment";

const Devices = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [showAlert, setShowAlert] = useState(true);
  const { handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const sampleDevices = [
    {
      id: 1,
      name: "GPS-001",
      imei: "356307042637821",
      vehicle: "ABC-123",
      status: "Online",
      lastUpdate: "2 minutes ago",
      geofences: ["Office Area", "Warehouse Zone"],
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 2,
      name: "GPS-002",
      imei: "356307042637822",
      vehicle: "XYZ-456",
      status: "Offline",
      lastUpdate: "1 hour ago",
      geofences: ["Service Area"],
      statusColor: "bg-red-100 text-red-800",
    },
    {
      id: 3,
      name: "GPS-003",
      imei: "356307042637823",
      vehicle: "DEF-789",
      status: "Online",
      lastUpdate: "5 minutes ago",
      geofences: ["Office Area"],
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 4,
      name: "GPS-004",
      imei: "356307042637824",
      vehicle: "GHI-012",
      status: "Maintenance",
      lastUpdate: "3 days ago",
      geofences: [],
      statusColor: "bg-yellow-100 text-yellow-800",
    },
    {
      id: 5,
      name: "GPS-005",
      imei: "356307042637825",
      vehicle: "JKL-345",
      status: "Online",
      lastUpdate: "1 minute ago",
      geofences: ["Warehouse Zone", "Service Area"],
      statusColor: "bg-green-100 text-green-800",
    },
  ];

  const initialValue = {
    name: "",
    uniqueId: "",
    status: "",
    disabled: false,
    lastUpdate: new Date(),
    positionId: 0,
    groupId: null,
    phone: "",
    model: "",
    contact: "",
    category: "",
    attributes: {},
  };

  const [formData, setFormData] = useState(initialValue);

  const {
    name,
    uniqueId,
    status,
    disabled,
    lastUpdate,
    positionId,
    groupId,
    phone,
    contact,
    model,
    category,
    attributes,
  } = formData;

  // Handle basic input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddDevice = async () => {
    if (!category) {
      alert("Please select categoty");
      return;
    }

    try {
      setLoading(true);
      const url = `${apiURL}/devices`;

      const response = await axiosInstance.post(url, formData, {
        withCredentials: true,
      });

      console.log(response, "response from adding company");

      toast.success("Device Successfully Added");
      setFormData(initialValue);
      setIsModalOpen(false);
    } catch (err: any) {
      const message = err?.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const fetchDevices = async () => {
    const res = await axiosInstance.get(`${apiURL}/devices`, {
      withCredentials: true,
    });
    console.log(res.data, "response");
    return res.data;
  };

  const {
    data: devices = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["devices"],
    queryFn: fetchDevices,
    staleTime: 5 * 60 * 1000,
  });

  const filteredDevices = devices.filter((device) => {
    const matchesSearch =
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.uniqueId.includes(searchTerm) ||
      device.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All Status" || device.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    total: devices.length,
    online: devices.filter((d) => d.status === "online").length,
    offline: devices.filter((d) => d.status === "offline").length,
    maintenance: devices.filter((d) => d.status === "maintenance").length,
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "online":
        return "bg-green-100 text-green-800";
      case "offline":
        return "bg-red-100 text-red-800";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800";
      case "inactive":
        return "bg-gray-100 text-gray-700";
      case "error":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex-1 flex flex-col">
        {/* {showAlert && (
        <Alert className="bg-blue-50 border-blue-200 mx-6 mt-6 text-blue-700">
          <Info className="h-4 w-4 text-blue-500" />
          <AlertDescription className="flex items-center justify-between w-full">
            <span>This is demo user some features are disabled.</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAlert(false)}
              className="text-blue-500 hover:text-blue-700 p-0 h-auto"
            >
              <X className="h-4 w-4" />
            </Button>
          </AlertDescription>
        </Alert>
      )} */}

        <main className="flex-1 p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Devices Management
              </h2>
              <p className="text-gray-600 text-sm">
                Monitor and manage vehicle tracking devices
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary hover:bg-primary/90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Device
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4 md:gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <Microchip className="text-primary text-xl h-6 w-6" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Total Devices</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {statusCounts.total}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <Wifi className="text-green-600 text-xl h-6 w-6" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Online</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {statusCounts.online}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                  <WifiOff className="text-red-600 text-xl h-6 w-6" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Offline</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {statusCounts.offline}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                  <Wrench className="text-yellow-600 text-xl h-6 w-6" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Maintenance</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {statusCounts.maintenance}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  Device List
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search devices..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-64"
                    />
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Status">All Status</SelectItem>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="offline">Offline</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Device
                    </TableHead>
                    <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      IMEI
                    </TableHead>
                    <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Model
                    </TableHead>
                    <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </TableHead>
                    <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Update
                    </TableHead>
                    {/* <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Geofences
                    </TableHead> */}
                    <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-white divide-y divide-gray-200">
                  {filteredDevices.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center">
                          <Microchip className="text-gray-300 h-16 w-16 mb-4" />
                          <p className="text-gray-500 text-lg">
                            No devices found
                          </p>
                          <p className="text-gray-400 text-sm mt-2">
                            Try adjusting your search or filter criteria
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredDevices.map((device) => (
                      <TableRow key={device.id}>
                        <TableCell>
                          <div className="flex items-center">
                            <Microchip className="text-primary h-5 w-5 mr-3" />
                            <span className="text-sm font-medium text-gray-900">
                              {device.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-900">
                          {device.uniqueId}
                        </TableCell>
                        <TableCell className="text-sm text-gray-900">
                          {device.model}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(device.status)}>
                            {device.status.charAt(0).toUpperCase() +
                              device.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {moment(device.lastUpdate).format(
                            "D MMMM, YYYY. h:mm A"
                          )}
                        </TableCell>
                        {/* <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {device.geofences.length === 0 ? (
                              <span className="text-sm text-gray-400">
                                None
                              </span>
                            ) : (
                              device.geofences.map((geofence, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {geofence}
                                </Badge>
                              ))
                            )}
                          </div>
                        </TableCell> */}
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {/* <Button
                              variant="ghost"
                              size="icon"
                              className="text-blue-600 hover:text-blue-900 h-8 w-8"
                            >
                              <Eye className="h-4 w-4" />
                            </Button> */}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-yellow-600 hover:text-yellow-900 h-8 w-8"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-600 hover:text-red-900 h-8 w-8"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="w-full max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Device</DialogTitle>
            </DialogHeader>
            <form
              className="space-y-4"
              onSubmit={handleSubmit(handleAddDevice)}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Device Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter device name"
                  className="w-full"
                  name="name"
                  value={name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  IMEI Number
                </label>
                <Input
                  type="text"
                  placeholder="Enter IMEI number"
                  className="w-full"
                  name="uniqueId"
                  value={uniqueId}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Device Model
                </label>
                <Input
                  type="text"
                  placeholder="Enter device model"
                  className="w-full"
                  name="model"
                  value={model}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <Input
                  type="text"
                  placeholder="Enter phone number"
                  className="w-full"
                  name="phone"
                  value={phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Device Category
                </label>
                <Select
                  required
                  value={category}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Animal">Animal</SelectItem>
                    <SelectItem value="Bicycle">Bicycle</SelectItem>
                    <SelectItem value="Boat">Boat</SelectItem>
                    <SelectItem value="Bus">Bus</SelectItem>
                    <SelectItem value="Car">Car</SelectItem>
                    <SelectItem value="Camper">Camper</SelectItem>
                    <SelectItem value="Crane">Crane</SelectItem>
                    <SelectItem value="Helicopter">Helicopter</SelectItem>
                    <SelectItem value="Motorcycle">Motorcycle</SelectItem>
                    <SelectItem value="Person">Person</SelectItem>
                    <SelectItem value="Plane">Plane</SelectItem>
                    <SelectItem value="Ship">Ship</SelectItem>
                    <SelectItem value="Tractor">Tractor</SelectItem>
                    <SelectItem value="Trailer">Trailer</SelectItem>
                    <SelectItem value="Train">Train</SelectItem>
                    <SelectItem value="Tram">Tram</SelectItem>
                    <SelectItem value="Truck">Truck</SelectItem>
                    <SelectItem value="Van">Van</SelectItem>
                    <SelectItem value="Scooter">Scooter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  {loading ? "Submitting..." : "Add Device"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default Devices;
