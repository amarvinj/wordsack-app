import React from "react";

const TitleBar = ({ icon, title, className, onClick, page }) => {
  return (
    // rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div onClick={() => onClick(page)}>
      <div className={className}>
        {icon}
        <div>{title}</div>
      </div>
    </div>
  );
};

export default TitleBar;
