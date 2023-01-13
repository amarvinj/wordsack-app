import React, { useState, useEffect, useRef } from "react";
import "./dropdown.css";

const Dropdown = ({
  label,
  selectedOption,
  setSelectedOption,
  options,
  title,
  borderOn,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

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

  const icon = isOpen ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-chevron-left"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#731BE3"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="15 6 9 12 15 18" />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-chevron-down"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#731BE3"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
  const className = `dropdown-component ${borderOn && "border-on"}`;

  return (
    <div className="dropdown">
      <div ref={ref} className={className}>
        {/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <div
          className="selected-options-wrapper"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div>{selectedOption.label}</div>
          {icon}
        </div>
        {isOpen && (
          <div className="dropdown-options">
            {options.length > 0 &&
              options.map((option) => (
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
