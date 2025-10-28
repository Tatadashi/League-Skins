import Home from "./pages/home/home.tsx";
import Champion from "./pages/home/champion/champion.tsx";
// import Sale from "./pages/sale/sale.tsx";
import Favorite from "./pages/favorite/favorite.tsx";
import Collection from "./pages/collection/collection.tsx";
import Skin from "./pages/collection/skin/skin.tsx";
import About from "./pages/about/about.tsx";
const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:championID",
    element: <Champion />,
    errorElement: <Home />,
  },
  // {
  //   path: "/sale",
  //   element: <Sale />,
  // },
  {
    path: "/favorite",
    element: <Favorite />,
    errorElement: <Collection />,
  },
  {
    path: "/collection",
    element: <Collection />,
    errorElement: <Home />,
  },
  {
    path: "/skin/:skinID",
    element: <Skin />,
    errorElement: <Collection />,
  },
  {
    path: "/about",
    element: <About />,
  },
];

export default routes;
