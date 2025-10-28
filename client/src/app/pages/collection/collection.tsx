import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../../components/header/header";
import Title from "../../../components/title/title";
import Sidebar from "../../../components/sidebar/sidebar";
import Banner from "../../../components/bannerArt/banner";
import Footer from "../../../components/footer/footer";
import SkinFilter from "../../../feature/filter/skinFilter/skinFilter";
import Pagination from "../../../utils/pagination";
import SkinDisplay from "../../../feature/squareDisplay/skinDisplay/skinDisplay";
import type { Dispatch, SetStateAction } from "react";

//gets buggy on really thin phone screens, not willing to make pagination, skinSquare, filter any thinner

export interface Skin {
  skin_id: number;
  id: number;
  name: string;
  champion_name: string;
  wiki_name: string;
  rarity: string;
  skin_line: string | null;
  splash_url: string;
  tile_url: string;
  updated_at?: Date;
}

export default function Collection() {
  //make sure there is champ info for skins.tsx
  const navigate = useNavigate();
  if (!("champs" in localStorage)) {
    navigate("/");
  }

  const [skins, setSkins]: [Skin[], Dispatch<SetStateAction<Skin[]>>] =
    useState(() => {
      const skinData = localStorage.getItem("skins");
      return skinData ? JSON.parse(skinData) : null;
    });
  useEffect(() => {
    const fetchSkins = async () => {
      try {
        //secondary is just in case user deletes localStorage data
        if (
          !("skins" in localStorage) ||
          localStorage.version !== "Patch 25.21 e1"
        ) {
          fetch("https://league-skins-backend.vercel.app/skin")
            .then((response) => response.json())
            .then((data) => {
              setSkins(data);
              localStorage.setItem("skins", JSON.stringify(data));
            });
        }
      } catch (error) {
        console.error("Error fetching skins", error);
      }
    };

    if (!skins) {
      fetchSkins();
    }
  }, [skins]);

  //filter by name (caseinsensitive)
  function filterSkins(query: string) {
    const filtered: Skin[] = [];
    skins?.forEach((skin) => {
      if (
        skin.name.toLowerCase().includes(query.toLowerCase()) ||
        skin.champion_name.toLowerCase().includes(query.toLowerCase())
      ) {
        filtered.push(skin);
      }
    });
    return filtered;
  }

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
