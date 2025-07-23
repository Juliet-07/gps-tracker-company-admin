
import CompaniesResults from "./CompaniesResults";
import AdminsResults from "./AdminsResults";

const SearchResults = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CompaniesResults />
            <AdminsResults />
        </div>
    )
}
export default SearchResults;

