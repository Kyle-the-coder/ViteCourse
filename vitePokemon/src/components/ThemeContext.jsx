// ThemeContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("isDarkMode", darkMode);
  }, []);

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("isDarkMode", darkMode);
    const isDark = localStorage.getItem("isDarkMode");
    setDarkMode(!darkMode);
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
