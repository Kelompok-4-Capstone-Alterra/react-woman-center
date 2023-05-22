import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

const Tables = () => {
  return (
    <div className="max-w-6xl p-4 border border-primaryBorder">
      <div className="flex items-center justify-between px-8 py-4 bg-primaryPressed">
        <h2 className="text-2xl text-white">Counselor's List</h2>
        <div className="h-14 w-[567px] relative rounded-[3px] overflow-hidden">
          <input
            className="w-full py-4 ps-16 text-[16px] tracking-[0.5px] placeholder:text-[16px] placeholder:tracking-[0.5px] placeholder:font-normal"
            type="text"
            name=""
            id=""
            placeholder="Search what you need here..."
          />
          <SearchIcon fontSize="large" className="absolute z-10 left-4 top-2" />
        </div>
      </div>
      <table className="w-full text-center">
        <thead>
          <tr className="h-[56px] border-b-secondary border-b">
            <th className="w-[130px]">Counselor Id</th>
            <th className="w-[130px]">Name</th>
            <th className="w-[130px]">Username</th>
            <th className="w-[130px]">Email</th>
            <th className="w-[130px]">Category</th>
            <th className="w-[130px]">View</th>
            <th className="w-[130px]">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr className="h-[64px]">
            <td className="w-[130px]">1234567</td>
            <td className="w-[130px]">John Doe</td>
            <td className="w-[130px]">johndoe</td>
            <td className="w-[130px]">johndoe@example.com</td>
            <td className="w-[130px]">Mental Health</td>
            <td className="w-[130px]">
              <button className="w-[75%] py-2 text-white rounded bg-primaryMain">
                {" "}
                <VisibilityIcon /> View
              </button>
            </td>
            <td className="w-[130px]">
              <button className="w-[75%] py-2 border-2 rounded border-primaryMain text-primaryMain">
                <DeleteIcon /> Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Tables;
