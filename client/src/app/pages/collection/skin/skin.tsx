import { useParams } from "react-router-dom";
import type { Skin } from "../collection";
import type { Champ } from "../../home/home";
import Header from "../../../../components/header/header";
import Title from "../../../../components/title/title";
import Sidebar from "../../../../components/sidebar/sidebar";
import { borderColors } from "../../../../utils/borderColors";
import Footer from "../../../../components/footer/footer";
import { useState } from "react";

export default function Skin() {
  const { skinID } = useParams();
  const skinData = JSON.parse(String(localStorage.getItem("skins")));
  const skin: Skin = skinData.find(
    (skinData: Skin) => skinData.skin_id === Number(skinID),
  );

  const champData = JSON.parse(String(localStorage.getItem("champs")));
  const champ: Champ = champData.find(
    (champData: Champ) => champData.name === skin.champion_name,
  );

  const favoriteData = JSON.parse(String(localStorage.getItem("favorites")));
  const favorite: Skin | undefined = favoriteData.find(
    (skinData: Skin) => skinData.skin_id === skin.skin_id,
  );

  const isFavorited = favorite === undefined ? false : true;
  const [favorited, setFavorited] = useState(isFavorited);

  const rarityGems: { [gems: string]: string } = {
    standard: "bg-[url(assets/standard.png)]",
    epic: "bg-[url(assets/epic.png)]",
    legendary: "bg-[url(assets/legendary.png)]",
    mythic: "bg-[url(assets/mythic.png)]",
    ultimate: "bg-[url(assets/ultimate.png)]",
    exalted: "bg-[url(assets/exalted.png)]",
    transcendent: "bg-[url(assets/transcendent.png)]",
  };

  function findFavoriteIndex(stored: Skin[]) {
    let favoriteIndex: number = 0;
    for (let i = 0; i < stored.length; i++) {
      if (stored[i].skin_id === skin.skin_id) {
        favoriteIndex = i;
      }
    }

    return favoriteIndex;
  }

  const toggleFavorite = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    //get current favorite list
    const stored: Skin[] = JSON.parse(
      String(localStorage.getItem("favorites")),
    );

    if (!favorited) {
      stored.push(skin);
    } else {
      const storedIndex = findFavoriteIndex(stored);
      stored.splice(storedIndex, 1);
    }

    localStorage.setItem("favorites", JSON.stringify(stored));
    setFavorited(!favorited);
  };

  return (
    <>
      <Header />
      <Title />
      <div className="page-single-layout">
        <Sidebar />
        <div>
          <div className="bg-blue-400 dark:bg-dusk-blue grid lg:grid-cols-[1fr_255px]">
            <img src={skin.splash_url} alt="" />
            <nav
              className="flex flex-row lg:flex-col justify-around items-center"
              aria-label="external navigation"
            >
              <h1>Links</h1>
              <a
                // can't use dynamic tailwind bg-[url(champ.square_url)]
                className="aspect-square flex specific-page-link"
                href={`https://wiki.leagueoflegends.com/en-us/${skin.champion_name}`}
                title={`Visit Official Wiki for ${skin.champion_name}'s page`}
              >
                <img src={champ.square_url} alt="" />
              </a>
              <a
                className="bg-[url(https://wiki.leagueoflegends.com/en-us/images/Wiki.png)] bg-center-sqr bg-size-[90%] specific-page-link"
                href={`https://wiki.leagueoflegends.com/en-us/File:${skin.wiki_name}`}
                title={`Visit Official Wiki for ${skin.name}'s page`}
              ></a>
              <a
                className="bg-[url(https://modelviewer.lol/logo.svg)] bg-center-sqr bg-size-[80%] specific-page-link"
                href={`https://modelviewer.lol/model-viewer?id=${skin.skin_id}`}
                title={`Visit Khada for ${skin.name}'s 3D model`}
              ></a>
            </nav>
          </div>
          <div className="flex flex-col gap-5 sm:gap-20 lg:flex-row items-center justify-center py-2 px-2 lg:py-10 lg:px-10">
            <img
              className={`border-5 ${borderColors[skin.rarity.toLowerCase()]} rounded-full`}
              src={skin.tile_url}
              alt=""
            />
            <div className="relative">
              <h1 className="text-4xl sm:text-5xl xlg:text-7xl text-black dark:text-tan">
                {skin.name.toUpperCase()}
              </h1>
              <h2 className="text-2xl sm:text-4xl xlg:text-5xl text-amber-900 dark:text-brown">
                {skin.champion_name}
              </h2>
              <div className="flex flex-row justify-center lg:justify-around items-center dark:text-tan mt-10 lg:absolute lg:top-[-150px] lg:left-[-50px] gap-5 lg:gap-10 min-w-[25vw]">
                <div className="p-2 border rounded-4xl">
                  <h3>Skin Line: {skin.skin_line}</h3>
                </div>
                <div
                  className={`aspect-square ${rarityGems[skin.rarity.toLowerCase()]} bg-cover h-[50px] lg:h-[80px]`}
                />
              </div>
              <button
                className={`absolute bottom-[70px] left-[75%] lg:bottom-[-100px] ${favorited ? "bg-[url(assets/unfavorite.svg)]" : "bg-[url(assets/favorite.svg)]"} bg-center-sqr lg:bg-[center_top_0.9rem] bg-size-[90%] bg-blend-overlay ${favorited ? "bg-stone-300" : "bg-red-300"} border-2 border-black dark:border-green-500 p-5 lg:p-10 rounded-full`}
                onClick={(e) => toggleFavorite(e)}
                aria-label={`${favorited}: ? "Remove from Favorite" : "Add to Favorite"`}
              ></button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
