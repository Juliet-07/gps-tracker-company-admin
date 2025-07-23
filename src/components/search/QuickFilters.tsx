
import { Button } from "@/components/ui/button";
import { Building, Users, Clock, Star } from "lucide-react";

const QuickFilters = () => {
    return (
        <div className="flex flex-wrap gap-3 mb-6">
            <Button variant="outline" className="rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 border-transparent hover:text-blue-800 h-auto">
                <Building className="mr-2" />All Companies (24)
            </Button>
            <Button variant="outline" className="rounded-full bg-green-100 text-green-700 hover:bg-green-200 border-transparent hover:text-green-800 h-auto">
                <Users className="mr-2" />All Admins (48)
            </Button>
            <Button variant="outline" className="rounded-full bg-orange-100 text-orange-700 hover:bg-orange-200 border-transparent hover:text-orange-800 h-auto">
                <Clock className="mr-2" />Recently Added
            </Button>
            <Button variant="outline" className="rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 border-transparent hover:text-purple-800 h-auto">
                <Star className="mr-2" />Most Active
            </Button>
        </div>
    )
}
export default QuickFilters;

