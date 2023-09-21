import { homePage } from "./HomePage";

const { createBrowserRouter } = require("react-router-dom");

export const router = createBrowserRouter([{ path: "/", ...homePage }]);
