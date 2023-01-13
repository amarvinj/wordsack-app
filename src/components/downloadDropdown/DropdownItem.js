import "../../App.css";
import React, { useEffect } from "react";

function DropdownItem({ icon, btnName, setIsOpen, handleClick, myref }) {
  useEffect(() => {
    const onBodyClick = (event) => {
      if (myref.current.contains(event.target)) {
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
  }, [setIsOpen, myref]);

  return (
    // rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <li
      onClick={() => {
        handleClick();
      }}
      className="dropdown-item"
    >
      <div>
        {icon}
        {btnName}
      </div>
    </li>
  );
}

export default DropdownItem;
