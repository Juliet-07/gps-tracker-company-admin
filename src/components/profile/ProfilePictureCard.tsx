
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Trash } from "lucide-react";

const ProfilePictureCard = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-bold mb-4">Profile Picture</h3>
        <div className="text-center">
          <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-gray-200">
            <AvatarImage src="https://i.pravatar.cc/128?u=superadmin" alt="Profile" />
            <AvatarFallback>SA</AvatarFallback>
          </Avatar>
          <Button className="mb-2 w-full">
            <Camera className="mr-2 h-4 w-4" />
            Change Photo
          </Button>
          <Button variant="ghost" className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive">
            <Trash className="mr-2 h-4 w-4" />
            Remove Photo
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfilePictureCard;
