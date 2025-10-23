import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import Header from "../../../components/header/header";
import Title from "../../../components/title/title";
import Sidebar from "../../../components/sidebar/sidebar";
import Banner from "../../../components/bannerArt/banner";
import Footer from "../../../components/footer/footer";
import SkinFilter from "../../../feature/filter/skinFilter/skinFilter";
import SkinDisplay from "../../../feature/squareDisplay/skinDisplay/skinDisplay";

export interface Skin {
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

export default function Collection() {
  //redirect to make sure there is default query params
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.size === 0) {
      setSearchParams("?q=");
    }
  });

  const skins: Skin[] = JSON.parse(String(localStorage.getItem("champs")));

  //filter by name (caseinsensitive)
  function filterSkins(query: string) {
    const filtered: Skin[] = [];
    skins?.forEach((skin) => {
      if (skin.name.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(skin);
      }
    });
    return filtered;
  }

  const queryParams = String(searchParams.get("q"));
  const filtered: Skin[] = filterSkins(queryParams);
  return (
    <>
      <Header />
      <Title />
      <div className="page-layout">
        <Sidebar />
        <div>
          {/* sort + filter and pages */}
          <SkinFilter />
          <SkinDisplay skinList={filtered} />
        </div>
        <Banner />
      </div>
      <Footer />
    </>
  );
}
