import Catalog from "./pages/catalog/catalog.tsx";
import About from "./pages/about/about.tsx";
const routes = [
  {
    path: "/",
    element: <Catalog />,
  },
  {
    path: "/about",
    element: <About />,
  },
];

export default routes;
