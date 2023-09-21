import { createBrowserRouter } from "react-router-dom";
import { homePage } from "./HomePage";

export const router = createBrowserRouter([{ path: "/", ...homePage }]);
