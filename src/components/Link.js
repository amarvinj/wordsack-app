import React, { useContext } from "react";
import NavigationContext from "../context/navigation";

function Link({ to, children }) {
  const { navigate } = useContext(NavigationContext);

  const handleClick = (event) => {
    event.preventDefault();

    navigate(to);
  };
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  // rome-ignore lint/a11y/useValidAnchor: <explanation>
  return <a onClick={handleClick}>{children}</a>;
}

export default Link;
