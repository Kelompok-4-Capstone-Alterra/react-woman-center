import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AnnouncementIcon from "@mui/icons-material/Announcement";

const Popup = ({ message, success, failed }) => {
  return (
    <div className="bg-transparent flex justify-center items-center w-[100vw] h-[100vh] translate-x-[-10%] translate-y-[-10%] absolute">
      <div className=" w-[210px] h-[105px] justify-center items-center flex flex-col rounded shadow-md">
        {success && (
          <CheckCircleIcon fontSize="large" className="mb-2 text-successMain" />
        )}
        {failed && (
          <AnnouncementIcon fontSize="large" className="mb-2 text-dangerMain" />
        )}
        {message}
      </div>
    </div>
  );
};

export default Popup;
