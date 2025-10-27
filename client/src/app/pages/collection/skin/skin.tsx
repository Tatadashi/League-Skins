import { useParams } from "react-router-dom";
import type { Skin } from "../collection";
import type { Champ } from "../../home/home";
import Header from "../../../../components/header/header";
import Title from "../../../../components/title/title";
import Sidebar from "../../../../components/sidebar/sidebar";
import { borderColors } from "../../../../utils/borderColors";
import Footer from "../../../../components/footer/footer";

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
              <div className="flex flex-row justify-around items-center dark:text-tan mt-10 lg:absolute lg:top-[-150px] lg:left-[-50px] lg:gap-10 min-w-[25vw]">
                <div className="p-2 border rounded-4xl">
                  <h3>Skin Line: {skin.skin_line}</h3>
                </div>
                <img
                  src={`/src/assets/${skin.rarity.toLowerCase()}.png`}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
