import React from "react";

// props Value
//  - type = "ongoing", "completed", "waiting", "canceled", "available", "unavailable"

const StatusTag = ({ type }) => {
  return (
    <button
      className={`max-w-[130px] w-[90%] text-xs min-h-[45px] text-white capitalize text-center mx-auto rounded py-3 cursor-default outline-none border-none
      ${type == "ongoing" ? "bg-primaryMain" : ""}
      ${type == "completed" ? "bg-successMain" : ""}
      ${type == "success" ? "bg-successMain" : ""}
      ${type == "waiting" ? "bg-secondaryMain" : ""}
      ${type == "pending" ? "bg-secondaryMain" : ""}
      ${type == "canceled" ? "bg-dangerMain" : ""}
      ${type == "available" ? "bg-successMain" : ""}
      ${type == "unavailable" ? "bg-dangerMain" : ""}
      `}
    >
      {type}
    </button>
  );
};

export default StatusTag;
