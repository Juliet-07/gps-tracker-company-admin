
import { type LucideIcon } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type QuickActionCardProps = {
  title: string;
  description: string;
  buttonText: string;
  buttonIcon: LucideIcon;
  titleIcon: LucideIcon;
  imageUrl: string;
};

const QuickActionCard = ({ title, description, buttonText, buttonIcon: ButtonIcon, titleIcon: TitleIcon, imageUrl }: QuickActionCardProps) => {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-6 flex items-center space-x-4">
        <img className="w-32 h-32 object-cover rounded hidden sm:block" src={imageUrl} alt={title} />
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2 flex items-center">
            <TitleIcon className="mr-2 h-5 w-5" />
            <span>{title}</span>
          </h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <Button>
            <ButtonIcon className="mr-2 h-4 w-4" />
            <span>{buttonText}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActionCard;
