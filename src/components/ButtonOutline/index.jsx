import React from "react";

export default function ButtonOutline({
  type = "submit",
  className = "",
  processing,
  onClick,
  children,
}) {
  return (
    <button
      type={type}
      className={
        `box-border min-h-[45px] bg-white border-2 border-primaryMain hover:bg-[#954E80] hover:text-white hover:border-[#954E80] active:bg-[#913175] py-3 px-3 rounded-[3px] text-primaryMain text-xs transition ${
          processing ? "opacity-25" : ""
        }` + className
      }
      disabled={processing}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
