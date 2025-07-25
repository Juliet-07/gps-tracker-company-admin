import { useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast, ToastContainer } from "react-toastify";

interface AssignDeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AssignDevice = ({ isOpen, onClose }: AssignDeviceModalProps) => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const { handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const initialValue = {
    userId: 0,
    deviceId: 0,
    // groupId: null,
    // geofenceId: null,
    // notificationId: null,
    // calendarId: null,
    // attributeId: null,
    // driverId: null,
    // managedUserId: null,
    // commandId: null,
  };

  const [formData, setFormData] = useState(initialValue);

  const {
    userId,
    deviceId,
   
  } = formData;

  const fetchUsers = async () => {
    const res = await axiosInstance.get(`${apiURL}/users`, {
      withCredentials: true,
    });
    // console.log(res.data, "response");
    return res.data;
  };

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000,
  });

  const fetchDevices = async () => {
    const res = await axiosInstance.get(`${apiURL}/devices`, {
      withCredentials: true,
    });
    // console.log(res.data, "response");
    return res.data;
  };

  const { data: devices = [] } = useQuery({
    queryKey: ["devices"],
    queryFn: fetchDevices,
    staleTime: 5 * 60 * 1000,
  });

  const handleAssignDevice = async () => {
    try {
      setLoading(true);
      const url = `${apiURL}/permissions`;

      const response = await axiosInstance.post(url, formData, {
        withCredentials: true,
      });

      console.log(response, "response from assigning user");

      toast.success("Device Successfully Assigned");
      setFormData(initialValue);
      //   onClose()
    } catch (err: any) {
      const message = err?.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <ToastContainer />
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-md w-full">
          <div className="flex justify-between items-center p-6 border-b">
            <h3 className="text-lg font-semibold">
              Assign Device(s) To A User
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="p-6">
            <form
              onSubmit={handleSubmit(handleAssignDevice)}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="company" className="mb-2 block">
                  Select User <span className="text-red-500">*</span>
                </Label>
                <Select
                  required
                  value={userId ? String(userId) : undefined}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      userId: Number(value),
                    }))
                  }
                >
                  <SelectTrigger id="company">
                    <SelectValue placeholder="Choose a user to assign device" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user: any) => (
                      <SelectItem key={user.id} value={String(user.id)}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="company" className="mb-2 block">
                  Select Device <span className="text-red-500">*</span>
                </Label>
                <Select
                  required
                  value={deviceId ? String(deviceId) : undefined}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      deviceId: Number(value),
                    }))
                  }
                >
                  <SelectTrigger id="company">
                    <SelectValue placeholder="Choose a device to assign to user" />
                  </SelectTrigger>
                  <SelectContent>
                    {devices.map((device: any) => (
                      <SelectItem key={device.id} value={String(device.id)}>
                        {device.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-3 p-6 border-t">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90"
                >
                  {loading ? "Submitting" : "Assign Device"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignDevice;
