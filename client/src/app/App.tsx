import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./router";
import { useEffect } from "react";

const router = createBrowserRouter(routes);

function App() {
  useEffect(() => {
    const fetchChamps = async () => {
      try {
        //secondary is just in case user deletes localStorage data
        if (
          !("champs" in localStorage) ||
          localStorage.version !== "Patch 25.21"
        ) {
          fetch("https://league-skins-one.vercel.app/champion")
            .then((response) => response.json())
            .then((data) => {
              localStorage.setItem("champs", JSON.stringify(data));
            });
        }
      } catch (error) {
        console.error("Error fetching champs", error);
      }
    };

    const fetchSkins = async () => {
      try {
        //secondary is just in case user deletes localStorage data
        if (
          !("skins" in localStorage) ||
          localStorage.version !== "Patch 25.21"
        ) {
          fetch("https://league-skins-one.vercel.app/skin")
            .then((response) => response.json())
            .then((data) => {
              localStorage.setItem("skins", JSON.stringify(data));
            });
        }
      } catch (error) {
        console.error("Error fetching skins", error);
      }
    };

    const fetchVersion = async () => {
      try {
        if (localStorage.version !== "Patch 25.21") {
          fetch("https://league-skins-one.vercel.app/")
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
        await fetchChamps();
        await fetchSkins();
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
