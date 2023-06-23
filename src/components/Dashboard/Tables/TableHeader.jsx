import React from "react";

const TableHeader = ({ children }) => {
  return (
    <thead>
      <tr className="h-[56px] border-b-secondaryMain border-b">{children}</tr>
    </thead>
  );
};

export default TableHeader;
