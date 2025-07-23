
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const SearchBar = () => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input type="text" placeholder="Search companies, admins, emails..." className="w-full pl-12 pr-4 py-3 h-auto" />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                    <Select defaultValue="all">
                        <SelectTrigger className="w-full sm:w-auto h-auto py-3">
                            <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="companies">Companies</SelectItem>
                            <SelectItem value="admins">Admins</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select defaultValue="all">
                        <SelectTrigger className="w-full sm:w-auto h-auto py-3">
                            <SelectValue placeholder="All Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="suspended">Suspended</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button className="h-auto py-3 px-6">
                        <Search className="mr-2 h-4 w-4" />Search
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default SearchBar;

