import { ExpandMoreRounded } from "@mui/icons-material";

const FilterDropdown = (props) => {
  const { className, children } = props;

  console.log(props);

  return (
    <div className="flex justify-center items-center relative border border-neutral border-neutralMediumLow min-w-[6rem] rounded-[3px] overflow-hidden ">
      {/*  focus:outline-none  */}
      <select
        className={`border-none no-appereance bg-white  focus:outline-none w-full py-1 px-2 ${
          className || ""
        }`}
        {...props}
      >
        {children}
      </select>
      <div className="absolute right-0 w-8">
        <ExpandMoreRounded />
      </div>
    </div>
  );
};

// Option
const FilterOption = (props) => {
  const { className, children } = props;

  return (
    <option
      className={`w-full checked:bg-primaryMain hover:bg-primaryHover active:bg-primaryHover focus:bg-primaryHover no-appereance outline-none ${
        className || ""
      }`}
      {...props}
    >
      {children}
    </option>
  );
};

FilterDropdown.Option = FilterOption;

export default FilterDropdown;
