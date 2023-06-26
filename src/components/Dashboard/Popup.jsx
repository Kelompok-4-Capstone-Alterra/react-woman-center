import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AnnouncementIcon from "@mui/icons-material/Announcement";

const Popup = ({ message, isSuccess, isOpen }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed w-[100vw] h-[100vh] z-998 inset-0 flex flex-col items-center overflow-auto">
          <div className="fixed bg-black opacity-50 w-[100vw] h-[100vh] inset-0"></div>
          <div className="z-999 h-full flex justify-center items-center">
            <div className=" w-[250px] h-[125px] justify-center items-center flex flex-col rounded shadow-md op bg-white">
              {isSuccess && (
                <CheckCircleIcon
                  className="text-successMain"
                  sx={{ fontSize: "50px" }}
                />
              )}
              {!isSuccess && (
                <AnnouncementIcon
                  className="text-dangerMain"
                  sx={{ fontSize: "50px" }}
                />
              )}
              <p className="font-medium capitalize-first">{message}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
