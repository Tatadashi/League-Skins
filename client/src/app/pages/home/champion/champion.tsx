import { useParams } from "react-router-dom";
import type { Champ } from "../home";
import Header from "../../../../components/header/header";
import Title from "../../../../components/title/title";
import Sidebar from "../../../../components/sidebar/sidebar";
import Footer from "../../../../components/footer/footer";

export default function Champion() {
  const { championID } = useParams();
  const data = JSON.parse(String(localStorage.getItem("champs")));
  const champion = data.find((champ: Champ) => champ.id === Number(championID));

  return (
    <>
      <Header />
      <Title />
      <div className="page-single-layout">
        <Sidebar />
        <div>
          <div className="bg-blue-400 dark:bg-dusk-blue grid lg:grid-cols-[1fr_255px]">
            <img src={champion.splash_url} alt="" />
            <nav
              className="flex flex-row lg:flex-col justify-around items-center"
              aria-label="external navigation"
            >
              <h1>Links</h1>
              <a
                className="bg-center-sqr specific-page-link"
                href={`https://www.leagueoflegends.com/en-us/champions/${champion.alias.toLowerCase()}`}
                title={`Visit Offical League Website for ${champion.name}`}
              >
                <img className="w-[100%]" src={champion.square_url} alt="" />
              </a>
              <a
                className="bg-[url(https://wiki.leagueoflegends.com/en-us/images/Wiki.png)] bg-center-sqr bg-size-[90%] specific-page-link"
                href={`https://wiki.leagueoflegends.com/en-us/${champion.name}`}
                title={`Visit Official Wiki for ${champion.name}'s page`}
              ></a>
              <a
                className="bg-[url(https://modelviewer.lol/logo.svg)] bg-center-sqr bg-size-[80%] specific-page-link"
                href={`https://modelviewer.lol/model-viewer?id=${champion.id + "000"}`}
                title={`Visit Khada for ${champion.name}'s 3D model`}
              ></a>
            </nav>
          </div>
          <div className="flex flex-col gap-5 lg:flex-row items-center justify-around py-2 px-2 lg:py-10 lg:px-10">
            <img
              className="border-5 border-black dark:border-tan rounded-full"
              src={champion.tile_url}
              alt=""
            />
            <div className="relative">
              <h1 className="text-4xl sm:text-7xl text-black dark:text-tan">
                {champion.name.toUpperCase()}
              </h1>
              {/* descriptions no capitalizing convention in files/db */}
              <h2 className="text-2xl sm:text-5xl text-amber-900 dark:text-brown">
                {champion.description.toUpperCase()}
              </h2>
              <div className="dark:text-tan mt-10 lg:absolute lg:bottom-[-100px]">
                <h3>ID: {champion.id}</h3>
                <h3>Release Date: {champion.release_date}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
