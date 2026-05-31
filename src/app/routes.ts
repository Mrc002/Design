import { createBrowserRouter } from "react-router";
import { Home } from "./components/Home";
import { Grabadora } from "./components/Grabadora";
import { Categorizador } from "./components/Categorizador";
import { SignDetail } from "./components/SignDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/grabadora",
    Component: Grabadora,
  },
  {
    path: "/categorizar",
    Component: Categorizador,
  },
  {
    path: "/sign/:signId",
    Component: SignDetail,
  },
]);
