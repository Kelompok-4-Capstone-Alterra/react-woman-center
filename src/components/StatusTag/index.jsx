import React from "react";

// props Value
//  - type = "ongoing", "completed", "waiting", "canceled", "available", "unavailable"

const StatusTag = ({ type }) => {
  return (
    <button
      className={`w-[90%] text-white capitalize text-center mx-auto rounded py-3 cursor-default outline-none border-none
      ${type == "ongoing" ? "bg-primaryMain" : ""}
      ${type == "completed" ? "bg-successMain" : ""}
      ${type == "waiting" ? "bg-secondaryMain" : ""}
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
