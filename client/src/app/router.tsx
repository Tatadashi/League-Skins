import Home from "./pages/home/home.tsx";
import Champion from "./pages/home/champion/champion.tsx";
import Sale from "./pages/sale/sale.tsx";
import Wishlist from "./pages/wishlist/wishlist.tsx";
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
  },
  {
    path: "/sale",
    element: <Sale />,
  },
  {
    path: "/wishlist",
    element: <Wishlist />,
  },
  {
    path: "/collection",
    element: <Collection />,
  },
  {
    path: "/skin/:skinID",
    element: <Skin />,
  },
  {
    path: "/about",
    element: <About />,
  },
];

export default routes;
