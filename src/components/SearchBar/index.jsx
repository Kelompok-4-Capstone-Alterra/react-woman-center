import { SearchRounded } from "@mui/icons-material";

const SearchBar = (props) => {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-md">
      <SearchRounded />
      <input {...props} />
    </div>
  );
};

export default SearchBar;
