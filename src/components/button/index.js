import React from "react";
import { BUTTON_TYPES } from "../../common/data/button";
import "./button.css";

const Button = ({
  type,
  btnText,
  icon,
  iconPos,
  onButtonClick,
  styles,
  disabled,
}) => {
  const getButtonClass = () => {
    switch (type) {
      case BUTTON_TYPES.PRIMARY:
        return `primaryBtn button ${styles}`;
      case BUTTON_TYPES.SECONDARY:
        return `secondaryBtn button ${styles}`;
      default:
        return `tertiaryBtn button ${styles}`;
    }
  };

  return (
    // rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      className={getButtonClass()}
      onClick={onButtonClick}
      disabled={disabled}
    >
      {icon && iconPos === "LEFT" && icon}
      {btnText}
      {icon && iconPos === "RIGHT" && icon}
    </div>
  );
};

export default Button;
