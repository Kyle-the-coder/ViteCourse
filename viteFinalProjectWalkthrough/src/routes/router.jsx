import { createBrowserRouter } from "react-router-dom";
import { Posts } from "../pages/Posts";
export const router = createBrowserRouter([{ path: "/", element: <Posts /> }]);
