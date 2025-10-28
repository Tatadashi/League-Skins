import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./router";
import { initializeTheme, watchTheme } from "../utils/theme";
import { useEffect } from "react";

const router = createBrowserRouter(routes);

initializeTheme();
watchTheme();

function App() {
  useEffect(() => {
    const fetchVersion = async () => {
      try {
        if (localStorage.version !== "Patch 25.21 e1") {
          fetch("https://league-skins-backend.vercel.app/")
            .then((response) => response.text())
            .then((data) => localStorage.setItem("version", data));
        }
      } catch (error) {
        console.error("Error fetching version", error);
      }
    };

    const fetchFavorites = async () => {
      try {
        if (!("favorites" in localStorage)) {
          localStorage.favorites = JSON.stringify([]);
        }
      } catch (error) {
        console.error("Error fetching favorites", error);
      }
    };

    //both since champ + skins is main thing
    const fetchBoth = async () => {
      try {
        await fetchVersion();
        await fetchFavorites();
      } catch (error) {
        console.error("Error fetching both", error);
      }
    };

    fetchBoth();
  }, []);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
