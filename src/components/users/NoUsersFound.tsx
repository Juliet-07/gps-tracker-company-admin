
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NoUsersFoundProps {
  onAddUser: () => void;
}

const NoUsersFound = ({ onAddUser }: NoUsersFoundProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Users List</h3>
      </div>
      <div className="flex flex-col items-center justify-center py-12 px-6">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <UserPlus className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
        <p className="text-gray-500 text-center mb-6 max-w-md">
          Get started by adding your first user to the system. You can assign roles and devices to manage access.
        </p>
        <Button onClick={onAddUser} className="bg-primary hover:bg-primary/90">
          <UserPlus className="mr-2 h-4 w-4" />
          Add First User
        </Button>
      </div>
    </div>
  );
};

export default NoUsersFound;
