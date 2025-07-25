import { useState } from "react";
import axiosInstance from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Car, Trash2 } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AddUserModal from "@/components/users/AddUserModal";
import AssignDevice from "@/components/users/AssignDeviceModal";
import NoUsersFound from "@/components/users/NoUsersFound";

const Users = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeviceModalOpen, setIsDeviceModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Users");

  const fetchUsers = async () => {
    const res = await axiosInstance.get(`${apiURL}/users`, {
      withCredentials: true,
    });
    console.log(res.data, "response");
    return res.data;
  };

  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000,
  });
  // Extended sample users data
  const allUsers = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      role: "Driver",
      avatar:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
      assignedDevices: "Vehicle-001, Vehicle-003",
      status: "Active",
      roleColor: "bg-blue-100 text-blue-800",
    },
    {
      id: 2,
      name: "Mike Wilson",
      email: "mike.wilson@company.com",
      role: "Admin",
      avatar:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
      assignedDevices: "All Devices",
      status: "Active",
      roleColor: "bg-purple-100 text-purple-800",
    },
    {
      id: 3,
      name: "James Davis",
      email: "james.davis@company.com",
      role: "Driver",
      avatar:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg",
      assignedDevices: "Vehicle-002",
      status: "Inactive",
      roleColor: "bg-blue-100 text-blue-800",
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      email: "emily.rodriguez@company.com",
      role: "Viewer",
      avatar:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
      assignedDevices: "Vehicle-004, Vehicle-005",
      status: "Active",
      roleColor: "bg-green-100 text-green-800",
    },
    {
      id: 5,
      name: "David Chen",
      email: "david.chen@company.com",
      role: "Driver",
      avatar:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
      assignedDevices: "Vehicle-006",
      status: "Active",
      roleColor: "bg-blue-100 text-blue-800",
    },
    {
      id: 6,
      name: "Lisa Thompson",
      email: "lisa.thompson@company.com",
      role: "Admin",
      avatar:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg",
      assignedDevices: "All Devices",
      status: "Inactive",
      roleColor: "bg-purple-100 text-purple-800",
    },
  ];

  // Filter users based on search term and status
  const filteredUsers = allUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All Users" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeColor = (status: string) => {
    return status === "Active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  return (
    <div className="w-full p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          User Management
        </h1>
        <p className="text-gray-600 text-sm">
          Manage user accounts and permissions
        </p>
      </div>

      <div className="flex justify-between items-stretch md:items-center mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search users..."
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
              <SelectItem value="All Users">All Users</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-x-4">
          {" "}
          <Button
            onClick={() => setIsDeviceModalOpen(true)}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Assign Device
          </Button>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <NoUsersFound onAddUser={() => setIsModalOpen(true)} />
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden hidden md:block">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="md:text-lg font-semibold text-gray-800">
                Users List
              </h3>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </TableHead>
                    <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </TableHead>
                    <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </TableHead>
                    {/* <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assigned Devices
                    </TableHead> */}
                    <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </TableHead>
                    <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.role}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm text-gray-900">
                        {user.email}
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.roleColor}`}
                        >
                          {user.role}
                        </span>
                      </TableCell>
                      {/* <TableCell className="px-6 py-4 text-sm text-gray-900">
                        {user.assignedDevices}
                      </TableCell> */}
                      <TableCell className="px-6 py-4">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(
                            user.status
                          )}`}
                        >
                          {user.status}
                        </span>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-primary hover:text-primary/90"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">{filteredUsers.length}</span> of{" "}
              <span className="font-medium">{filteredUsers.length}</span>{" "}
              results
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button size="sm" className="bg-primary text-white">
                1
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </>
      )}

      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <AssignDevice
        isOpen={isDeviceModalOpen}
        onClose={() => setIsDeviceModalOpen(false)}
      />
    </div>
  );
};

export default Users;
