import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../../components/header/header";
import Title from "../../../components/title/title";
import Sidebar from "../../../components/sidebar/sidebar";
import Banner from "../../../components/bannerArt/banner";
import Footer from "../../../components/footer/footer";
import SkinFilter from "../../../feature/filter/skinFilter/skinFilter";
import Pagination from "../../../utils/pagination";
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

const skins: Skin[] = JSON.parse(String(localStorage.getItem("champs")));

export default function Collection() {
  //redirect to make sure there is default query params
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.size === 0) {
      setSearchParams("?q=");
    }
  });

  const queryParams = String(searchParams.get("q"));
  const filtered: Skin[] = filterSkins(queryParams);

  const [currentPage, setCurrentPage] = useState(1);
  const [skinsPerPage, setSkinsPerPage] = useState(32);

  //some widths might be off a little
  function calculateFit() {
    const pageWidth = window.innerWidth;
    const sidebarWidth = 110;
    const neekoWidth = 250;
    const skinWidth = 120;
    const smSize = 640;
    let amt;
    //number at end accounting for gap and padding
    if (pageWidth <= smSize) {
      amt = Math.floor((pageWidth - sidebarWidth) / (skinWidth + 3));
    } else {
      amt = Math.floor(
        (pageWidth - sidebarWidth - neekoWidth) / (skinWidth + 25),
      );
    }
    //height of neeko enough for 4 rows of skins
    return amt * 4;
  }

  useEffect(() => {
    setSkinsPerPage(calculateFit());
  }, []);

  const lastPageIndex = currentPage * skinsPerPage;
  const firstPageIndex = lastPageIndex - skinsPerPage;
  const currentSkins = filtered.slice(firstPageIndex, lastPageIndex);

  return (
    <>
      <Header />
      <Title />
      <div className="page-layout">
        <Sidebar />
        <div>
          {/* sort + filter and pages */}
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <SkinFilter />
            <Pagination
              totalSkins={filtered.length}
              skinsPerPage={skinsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
          <SkinDisplay skinList={currentSkins} />
        </div>
        <Banner />
      </div>
      <Footer />
    </>
  );
}
