import React, { useState, useEffect, useRef } from "react";

import { dropdownIconOne, dropdownIconTwo } from "../../common/data/icons";
import "./dropdown.css";

const Dropdown = ({
  label,
  selectedOption,
  setSelectedOption,
  options,
  title,
  borderOn,
  color,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const ref = useRef();

  useEffect(() => {
    if (isOpen) {
      setSearchWord("");
    } else {
      setSearchWord(selectedOption.label);
    }
  }, [selectedOption, isOpen]);

  useEffect(() => {
    const onBodyClick = (event) => {
      if (ref.current.contains(event.target)) {
        return;
      }
      setIsOpen(false);
    };
    document.body.addEventListener("click", onBodyClick, { capture: true });

    return () => {
      document.body.removeEventListener("click", onBodyClick, {
        capture: true,
      });
    };
  }, []);

  const handleSelected = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const hangleChange = (e) => {
    setSearchWord(e.target.value);
  };

  const handleClose = () => {
    setIsOpen(false);
    // console.log("hi", isOpen);
  };

  // console.log(isOpen);

  const icon = isOpen ? dropdownIconOne : dropdownIconTwo;

  const className = `dropdown-component ${borderOn && "border-on"}`;

  return (
    <div className="dropdown">
      <div ref={ref} className={className}>
        {/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <div
          className="selected-options-wrapper"
          onClick={() => setIsOpen(() => true)}
        >
          <input
            className="selected-option"
            style={{
              cursor: !isOpen && "pointer",
              color: !isOpen && color && "#731BE3",
            }}
            type="text"
            placeholder="Search"
            onChange={(event) => hangleChange(event)}
            value={
              disabled ? "English" : !isOpen ? selectedOption.label : searchWord
            }
          />
          {/* <div className="selected-option">{selectedOption.label}</div> */}

          {/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
          <div className="selected-option-icon" onClick={handleClose}>
            {icon}
          </div>
        </div>
        {isOpen && (
          <div className="dropdown-options">
            {options.length > 0 && searchWord !== ""
              ? options
                  .filter((option) => {
                    const searchTerm = searchWord.toLocaleLowerCase();
                    const searchList = option.label.toLocaleLowerCase();

                    return searchList.startsWith(searchTerm);
                  })
                  .map((option) => (
                    // rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                    <div
                      key={option.value}
                      className="dropdown-option text-color"
                      onClick={() => handleSelected(option)}
                    >
                      {option.label}
                    </div>
                  ))
              : options.map((option) => (
                  // rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                  <div
                    key={option.value}
                    className="dropdown-option text-color"
                    onClick={() => handleSelected(option)}
                  >
                    {option.label}
                  </div>
                ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
