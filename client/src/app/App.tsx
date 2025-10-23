import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./router";
import { useEffect } from "react";

const router = createBrowserRouter(routes);

function App() {
  useEffect(() => {
    const fetchChamps = async () => {
      try {
        // localStorage.clear();
        if (!("champs" in localStorage)) {
          fetch("http://localhost:6543/champion")
            .then((response) => response.json())
            .then((data) => {
              localStorage.setItem("champs", JSON.stringify(data));
            });
        }
      } catch (error) {
        console.error("Error fetching champs", error);
      }
    };
    fetchChamps();
  }, []);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
