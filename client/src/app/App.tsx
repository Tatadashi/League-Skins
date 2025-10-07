import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./router";

const router = createBrowserRouter(routes);

function App() {
  interface info {
    id: number;
    name: string;
  }
  const [info, setInfo] = useState<info[] | null>(null);

  useEffect(() => {
    const fetchSkins = async () => {
      try {
        // sessionStorage.clear();
        if (sessionStorage.length === 0) {
          fetch("http://localhost:6543/skins/1")
            .then((response) => response.json())
            .then((data) => {
              sessionStorage.setItem("name", JSON.stringify(data));
              setInfo(data);
            });
        } else {
          const data = JSON.parse(sessionStorage.getItem("name") || "null");
          // doesn't rerender
          setInfo(data);
        }
      } catch (error) {
        console.error("Error fetching name", error);
      }
    };
    fetchSkins();
  }, [setInfo]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
