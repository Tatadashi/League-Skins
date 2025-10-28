import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../../components/header/header";
import Title from "../../../components/title/title";
import Sidebar from "../../../components/sidebar/sidebar";
import Banner from "../../../components/bannerArt/banner";
import Footer from "../../../components/footer/footer";
import ChampionFilter from "../../../feature/filter/championFilter/championFilter";
import ChampDisplay from "../../../feature/squareDisplay/champDisplay/champDisplay";
import type { Dispatch, SetStateAction } from "react";

export interface Champ {
  id: number;
  name: string;
  description: string;
  alias: string;
  square_url: string;
  splash_url: string;
  tile_url: string;
  release_date: string;
  updated_at?: Date;
}

export default function Home() {
  const [champions, setChampions]: [
    Champ[],
    Dispatch<SetStateAction<Champ[]>>,
  ] = useState(() => {
    const champData = localStorage.getItem("champs");
    return champData ? JSON.parse(champData) : null;
  });

  useEffect(() => {
    const fetchChamps = async () => {
      try {
        //secondary is just in case user deletes localStorage data
        if (
          !("champs" in localStorage) ||
          localStorage.version !== "Patch 25.21"
        ) {
          fetch("https://league-skins-backend.vercel.app/champion")
            .then((response) => response.json())
            .then((data) => {
              setChampions(data);
              localStorage.setItem("champs", JSON.stringify(data));
            });
        }
      } catch (error) {
        console.error("Error fetching champs", error);
      }
    };

    //initial
    if (!champions) {
      fetchChamps();
    }
  }, [champions]);

  //redirect to make sure there is default query params
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.size === 0) {
      setSearchParams("?q=");
    }
  });

  //filter by name (caseinsensitive)
  function filterChamps(query: string) {
    const filtered: Champ[] = [];
    champions?.forEach((champ) => {
      if (champ.name.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(champ);
      }
    });
    return filtered;
  }

  const queryParams = String(searchParams.get("q"));
  const filtered: Champ[] = filterChamps(queryParams);
  return (
    <>
      <Header />
      <Title />
      <div className="page-layout">
        <Sidebar />
        <div>
          <ChampionFilter />
          <ChampDisplay champList={filtered} />
        </div>
        <Banner />
      </div>
      <Footer />
    </>
  );
}
