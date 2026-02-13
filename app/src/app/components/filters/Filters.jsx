import CategoryFilter from "./CategoryFilter";
import PriceRange from "./PriceRange";
import SearchBar from "./SearchBar";
import SortBy from "./SortBy";

const Filters = () => {
  return (
    <div>
      <SearchBar />
      <CategoryFilter />
      <PriceRange />
      <SortBy />
    </div>
  );
};

export default Filters;
