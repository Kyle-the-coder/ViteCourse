import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { homeRoute } from "../pages/Home";
import { newPokemonRoute } from "../pages/NewPokemon";
import { storageRoute } from "../pages/Storage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", ...homeRoute },
      { path: "/storage", ...storageRoute },
      { path: "/newpokemon", ...newPokemonRoute },
    ],
  },
]);
