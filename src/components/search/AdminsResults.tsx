
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, ChevronRight } from "lucide-react";

const admins = [
    { name: 'John Mitchell', email: 'john.mitchell@techcorp.com', company: 'TechCorp Solutions', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg', status: 'Active' },
    { name: 'Sarah Johnson', email: 'sarah.j@globallogistics.com', company: 'Global Logistics Ltd', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg', status: 'Active' },
    { name: 'Mike Rodriguez', email: 'm.rodriguez@metrotransport.com', company: 'Metro Transport Co', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg', status: 'Inactive' },
    { name: 'Emily Chen', email: 'emily.chen@swiftdelivery.com', company: 'Swift Delivery Services', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg', status: 'Active' },
];

type Admin = typeof admins[0];

const AdminItem = ({ admin }: { admin: Admin }) => (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
        <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
                <AvatarImage src={admin.avatar} alt={admin.name} />
                <AvatarFallback>{admin.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
                <h4 className="font-medium text-gray-800">{admin.name}</h4>
                <p className="text-sm text-gray-600">{admin.email} • {admin.company}</p>
            </div>
        </div>
        <div className="flex items-center space-x-2">
            <span className={`text-white text-xs px-2 py-1 rounded ${admin.status === 'Active' ? 'bg-green-500' : 'bg-orange-500'}`}>{admin.status}</span>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600">
                <ChevronRight />
            </Button>
        </div>
    </div>
);

const AdminsResults = () => {
    return (
        <Card>
            <CardHeader className="p-6 flex flex-row items-center justify-between">
                <CardTitle className="flex items-center !text-lg !font-semibold">
                    <Users className="text-green-500 mr-2" />
                    Admins (12 results)
                </CardTitle>
                <Button variant="link" className="text-primary p-0 h-auto">View All</Button>
            </CardHeader>
            <CardContent className="p-6 pt-0">
                <div className="space-y-4">
                    {admins.map(admin => <AdminItem key={admin.email} admin={admin} />)}
                </div>
            </CardContent>
        </Card>
    );
};
export default AdminsResults;

