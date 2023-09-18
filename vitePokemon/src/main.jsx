import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import "./styles/styles.css";

function Main() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", darkMode);
  };

  return (
    <React.StrictMode>
      <RouterProvider router={router}>
        <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
      </RouterProvider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
