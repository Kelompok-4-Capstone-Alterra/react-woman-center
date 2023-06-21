import { MenuItem, Select } from "@mui/material";

const FilterDropdown = ({ value, handleChange }) => {
  return (
    <Select
      value={value}
      onChange={handleChange}
      sx={{
        ".MuiSelect-select": {
          padding: "0.325rem 0.75rem",
        },
        ".MuiOutlinedInput-notchedOutline": {
          borderColor: "#9E9494 !important",
          borderWidth: "1px",
        },
      }}
      MenuProps={{
        sx: {
          "&& .Mui-selected": {
            backgroundColor: "#AF1582 !important",
            color: "#FFF",
          },
          "&& .Mui-selected:hover": {
            backgroundColor: "#954E80 !important",
          },
        },
      }}
    >
      <MenuItem
        value="newest"
        sx={{
          "&:checked": {
            backgroundColor: "#AF1582 !important",
            color: "#FFF",
          },
        }}
      >
        Newest
      </MenuItem>
      <MenuItem value="oldest">Oldest</MenuItem>
    </Select>
  );
};

export default FilterDropdown;
