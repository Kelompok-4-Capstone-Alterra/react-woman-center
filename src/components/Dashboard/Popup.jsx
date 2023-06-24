import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AnnouncementIcon from "@mui/icons-material/Announcement";

const Popup = ({ message, isSuccess, isOpen }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed w-[100vw] h-[100vh] z-10 inset-0 flex flex-col items-center overflow-auto">
          <div className="fixed bg-black opacity-50 w-[100vw] h-[100vh] inset-0"></div>
          <div className="z-10 h-full flex justify-center items-center">
            <div className=" w-[250px] h-[125px] justify-center items-center flex flex-col rounded shadow-md op bg-white">
              {isSuccess && (
                <CheckCircleIcon
                  fontSize="large"
                  className="mb-2 text-successMain"
                />
              )}
              {!isSuccess && (
                <AnnouncementIcon
                  fontSize="large"
                  className="mb-2 text-dangerMain"
                />
              )}
              {message}
            </div>
          </div>
        </div>
        // <div className="fixed w-[100vw] h-[100vh] z-10 inset-0 flex flex-col items-center overflow-auto">
        //   <div className="fixed bg-black opacity-50 w-[100vw] h-[100vh] inset-0"></div>
        //   <div className="fixed bg-black opacity-50 w-[100vw] h-[100vh] inset-0 flex justify-center items-center">
        //     <div className=" w-[210px] h-[105px] justify-center items-center flex flex-col rounded shadow-md bg-white">
        //       {success && (
        //         <CheckCircleIcon
        //           fontSize="large"
        //           className="mb-2 text-successMain"
        //         />
        //       )}
        //       {failed && (
        //         <AnnouncementIcon
        //           fontSize="large"
        //           className="mb-2 text-dangerMain"
        //         />
        //       )}
        //       {message}
        //     </div>
        //   </div>
        // </div>
      )}
    </>
  );
};

export default Popup;
