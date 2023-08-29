import { createBrowserRouter } from "react-router-dom";
import { homeRoute } from "../pages/Home";

export const router = createBrowserRouter([{ path: "/", ...homeRoute }]);
