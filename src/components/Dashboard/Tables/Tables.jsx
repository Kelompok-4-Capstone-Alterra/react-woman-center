import React from "react";

const Tables = ({ children, scroll }) => {
  return (
    <div className="overflow-auto border border-primaryBorder py-4 px-6">
      <table className={` ${scroll ? "w-[140%]" : "w-full"}  text-left`}>
        {children}
      </table>
    </div>
  );
};

export default Tables;
