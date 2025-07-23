
import { useState } from 'react';
import { format } from 'date-fns';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Info, X } from 'lucide-react';
import SearchBar from '@/components/search/SearchBar';
import QuickFilters from '@/components/search/QuickFilters';
import SearchResults from '@/components/search/SearchResults';
import RecentSearches from '@/components/search/RecentSearches';

const GlobalSearchPage = () => {
    const [isDemoAlertVisible, setDemoAlertVisible] = useState(true);
    return (
        <main className="p-6 bg-gray-50/50 min-h-screen">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Global Search</h1>
                    <p className="text-gray-600">Find companies and admins across the platform</p>
                </div>
                <div className="flex items-center space-x-3">
                    <span className="text-gray-600 hidden sm:inline">{format(new Date(), 'dd MMM, yyyy')}</span>
                </div>
            </div>

            {/* Demo Alert */}
            {isDemoAlertVisible && (
                <Alert className="bg-blue-50 border-blue-200 text-blue-700 mb-6 flex items-center justify-between">
                    <div className="flex items-center">
                        <Info className="h-5 w-5 text-blue-500" />
                        <AlertDescription className="ml-3">
                            This is demo user some features are disabled.
                        </AlertDescription>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-blue-500 hover:text-blue-700 hover:bg-transparent" onClick={() => setDemoAlertVisible(false)}>
                        <X className="h-4 w-4" />
                    </Button>
                </Alert>
            )}

            <SearchBar />
            <QuickFilters />
            <SearchResults />
            <RecentSearches />
        </main>
    )
}
export default GlobalSearchPage;

