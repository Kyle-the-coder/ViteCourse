// ThemeContext.js
import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode", darkMode);
    setDarkMode(!darkMode);
    localStorage.setItem("isDarkMode", darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
