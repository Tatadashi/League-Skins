import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import Header from "../../../components/header/header";
import Title from "../../../components/title/title";
import Sidebar from "../../../components/sidebar/sidebar";
import Banner from "../../../components/bannerArt/banner";
import Footer from "../../../components/footer/footer";
import ChampionFilter from "../../../feature/filter/championFilter/championFilter";
import ChampDisplay from "../../../feature/squareDisplay/champDisplay/champDisplay";

export interface Champ {
  id: number;
  name: string;
  description: string;
  alias: string;
  square_url: string;
  splash_url: string;
  tile_url: string;
  release_date: Date;
  created_at?: Date;
}

export default function Home() {
  //redirect to make sure there is default query params
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.size === 0) {
      setSearchParams("?q=");
    }
  });

  const champions: Champ[] = JSON.parse(String(localStorage.getItem("champs")));

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
          {/* sort + filter and pages */}
          <ChampionFilter />
          <ChampDisplay champList={filtered} />
        </div>
        <Banner />
      </div>
      <Footer />
    </>
  );
}
