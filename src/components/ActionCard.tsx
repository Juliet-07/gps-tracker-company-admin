
import { icons } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ActionCardProps = {
  title: string;
  description: string;
  buttonText: string;
  buttonIcon: keyof typeof icons;
  imageUrl: string;
};

const ActionCard = ({ title, description, buttonText, buttonIcon, imageUrl }: ActionCardProps) => {
  const LucideIcon = icons[buttonIcon];
  return (
    <Card className="shadow-sm">
      <CardContent className="p-6 flex items-center space-x-4">
        <img className="w-32 h-32 object-cover rounded hidden sm:block" src={imageUrl} alt={title} />
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <Button>
            <LucideIcon className="mr-2 h-4 w-4" />
            <span>{buttonText}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionCard;
