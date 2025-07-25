import { useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "@/api/axios";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast, ToastContainer } from "react-toastify";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddUserModal = ({ isOpen, onClose }: AddUserModalProps) => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const { handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const initialValue = {
    name: "",
    email: "",
    phone: "",
    password: "",
    readonly: true,
    administrator: true,
    map: null,
    latitude: 0.0,
    longitude: 0.0,
    zoom: 0,
    coordinateFormat: null,
    disabled: false,
    expirationTime: null,
    deviceLimit: 0,
    userLimit: 0,
    deviceReadonly: false,
    limitCommands: false,
    disableReports: false,
    fixedEmail: false,
    poiLayer: null,
    role: "COMPANY_USER",
    companyId: null,
    totpKey: null,
    temporary: false,
  };
  const [formData, setFormData] = useState(initialValue);

  const {
    name,
    email,
    password,
    phone,
    readonly,
    administrator,
    map,
    latitude,
    longitude,
    zoom,
    coordinateFormat,
    disabled,
    expirationTime,
    deviceLimit,
    userLimit,
    deviceReadonly,
    limitCommands,
    disableReports,
    fixedEmail,
    poiLayer,
    role,
    companyId,
    totpKey,
    temporary,
  } = formData;

  // Handle basic input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCompanyUser = async () => {
    try {
      setLoading(true);
      const url = `${apiURL}/users`;

      const response = await axiosInstance.post(url, formData, {
        withCredentials: true,
      });

      console.log(response, "response from adding user");

      toast.success("Company User Successfully Added");
      setFormData(initialValue);
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
            <h3 className="text-lg font-semibold">Add New User</h3>
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
              onSubmit={handleSubmit(handleAddCompanyUser)}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <Input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  className="w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  type="text"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  className="w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <Input
                  type="text"
                  name="phone"
                  value={phone}
                  onChange={handleChange}
                  className="w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <Input
                  type="text"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  className="w-full"
                  required
                />
              </div>

              {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Driver">Driver</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div> */}

              {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assign Devices
              </label>
              <select
                // multiple
                className="w-full px-3 py-2 border border-input rounded-md"
                onChange={(e) => {
                  const selected = Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                  );
                  setFormData({ ...formData, assignedDevices: selected });
                }}
              >
                <option value="Vehicle-001">Vehicle-001</option>
                <option value="Vehicle-002">Vehicle-002</option>
                <option value="Vehicle-003">Vehicle-003</option>
              </select>
            </div> */}
              <div className="flex justify-end space-x-3 p-6 border-t">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90"
                >
                  {loading ? "Submitting" : "Add User"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUserModal;
