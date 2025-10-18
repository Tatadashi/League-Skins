import { useState, useEffect } from "react";
import Header from "../../../components/header/header";
import Title from "../../../components/title/title";
import Sidebar from "../../../components/sidebar/sidebar";
import Banner from "../../../components/bannerArt/banner";
import Footer from "../../../components/footer/footer";
import ChampDisplay from "../../../feature/squareDisplay/champDisplay/champDisplay";

export interface Champ {
  id: number;
  name: string;
  alias: string;
  square_url: string;
  release_date: Date;
  created_at?: Date;
}

export default function Home() {
  const [champions, setChampions] = useState<Champ[]>();

  useEffect(() => {
    const fetchChamps = async () => {
      try {
        // localStorage.clear();
        if (!("champs" in localStorage)) {
          fetch("http://localhost:6543/champion")
            .then((response) => response.json())
            .then((data) => {
              localStorage.setItem("champs", JSON.stringify(data));
              setChampions(data);
            });
        } else {
          const data = JSON.parse(String(localStorage.getItem("champs")));
          setChampions(data);
        }
      } catch (error) {
        console.error("Error fetching champs", error);
      }
    };
    fetchChamps();
  }, [setChampions]);

  return (
    <>
      <Header />
      <Title />
      <div className="page-layout">
        <Sidebar />
        {/* sort + filter and pages */}
        <div>
          <ChampDisplay champList={champions} />
        </div>
        <Banner />
      </div>
      <Footer />
    </>
  );
}
