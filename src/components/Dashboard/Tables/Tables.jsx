import React from "react";

const Tables = ({ children, scroll }) => {
  return (
    <div className="overflow-auto border border-primaryBorder p-4">
      <table className={` ${scroll ? "w-[140%]" : "w-full"}  text-center`}>
        {children}
      </table>
    </div>
  );
};

export default Tables;
