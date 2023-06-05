import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { useController } from "react-hook-form";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const Dropdown = ({ control, name, placeholder, label, children, handleSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (selected) => {
    onChange(selected);
    toggleDropdown();
    handleSelect();
  };

  return (
    <div className="relative mb-5 flex flex-col">
      <label className="font-medium">{label}</label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className="w-full h-[48px] focus:outline-none px-4 border-solid border-2 rounded mt-2 flex items-center" onClick={toggleDropdown}>
            {field.value ? field.value.label : placeholder}
            {isOpen ? (
              <ExpandLess
                className="absolute top-[44px] right-4 cursor-pointer"
              />
            ) : (
              <ExpandMore
                className="absolute top-[44px] right-4 cursor-pointer"
              />
            )}
          </div>
        )}
      />
      {isOpen && (
        <ul className="absolute z-10 top-[calc(100%+2px)] w-full max-h-48 overflow-y-auto bg-white border-2 rounded mt-2">
          {React.Children.map(children, (child) => (
            <li
              key={child.props.value}
              className="px-8 py-4 h-[44px] flex items-center hover:bg-primaryHover hover:text-white"
              onClick={() => handleOptionSelect(child.props)}
            >
              {child.props.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
