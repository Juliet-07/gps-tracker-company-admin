
import { History } from "lucide-react";

const searches = [
    'TechCorp',
    'john.mitchell',
    'Global Logistics',
    'sarah.j@global',
    'Metro Transport',
];

const RecentSearches = () => {
    return (
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <History className="text-gray-500 mr-2" />
                Recent Searches
            </h3>
            <div className="flex flex-wrap gap-2">
                {searches.map((search) => (
                    <span key={search} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-200">
                        {search}
                    </span>
                ))}
            </div>
        </div>
    );
};
export default RecentSearches;

