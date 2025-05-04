import React, { useState, useEffect } from "react";

function CustomSelect({ options, selectedValue, onSelect }) {
  console.log("in custom options: ", options);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleOptionClick = (value) => {
    onSelect(value);
    setShowDropdown(false);
  };

  return (
    <div className="custom-select-container">
      <div
        className="custom-select-selected"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {options.find((option) => option.value === selectedValue)?.label ||
          "Select an option"}
      </div>
      {showDropdown && (
        <ul className="custom-select-options">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className="custom-select-option"
            >
              {option.logo && (
                <img
                  src={option.logo}
                  alt="Logo"
                  style={{ width: "20px", height: "20px", marginRight: "10px" }}
                />
              )}
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomSelect;
