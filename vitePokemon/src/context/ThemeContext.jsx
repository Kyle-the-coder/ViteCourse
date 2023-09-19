// ThemeContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const isDark = localStorage.getItem("isDarkMode");
    if (isDark == null) return false;
    console.log(isDark);
    return JSON.parse(isDark);
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else if (!darkMode) {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    if (!darkMode) {
      document.body.classList.remove("dark-mode");
    } else if (darkMode) {
      document.body.classList.add("dark-mode");
    }
    setDarkMode(!darkMode);
    localStorage.setItem("isDarkMode", !darkMode);
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
