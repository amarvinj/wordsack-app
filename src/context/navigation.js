import { createContext, useEffect, useState } from "react";

const NavigationContext = createContext();

function NavigationProvider({ children, baseUrl }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // const baseUrl = "/wordsack-app/";

  console.log("current path:", currentPath);

  useEffect(() => {
    const handler = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handler);

    return () => {
      window.removeEventListener("popstate", handler);
    };
  }, []);

  const navigate = (to) => {
    const url = baseUrl + to;
    console.log(url);
    window.history.pushState({}, "", to);
    setCurrentPath(to);
  };

  return (
    <NavigationContext.Provider value={{ currentPath, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
}
export { NavigationProvider };
export default NavigationContext;
