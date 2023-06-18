import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const TableTitle = ({ title }) => {
  return (
    <div className="flex items-center justify-between px-8 py-4 bg-primaryPressed">
      <h2 className="text-2xl text-white">{title}</h2>
      <div className="h-14 w-[567px] relative rounded-[3px] overflow-hidden">
        <input
          className="w-full py-4 ps-16 text-[16px] tracking-[0.5px] placeholder:text-[16px] placeholder:tracking-[0.5px] placeholder:font-normal"
          type="text"
          name=""
          id=""
          placeholder="Search what you need here..."
        />
        <SearchIcon fontSize="large" className="absolute z-[1] left-4 top-2" />
      </div>
    </div>
  );
};

export default TableTitle;
