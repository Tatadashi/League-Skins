import Header from "../../../components/header/header";
import Title from "../../../components/title/title";
import Sidebar from "../../../components/sidebar/sidebar";
import Banner from "../../../components/bannerArt/banner";
import Footer from "../../../components/footer/footer";
import ChampDisplay from "../../../feature/squareDisplay/champDisplay/champDisplay";

export default function Home() {
  //will be a state
  const champList: { name: string; url: string; id: number }[] = [
    {
      name: "Heimerdinger",
      url: "/src/assets/Helmet_Bro_profileicon.png",
      id: 0,
    },
    {
      name: "Aatrox",
      url: "/src/assets/Helmet_Bro_profileicon.png",
      id: 1,
    },
    {
      name: "Draven",
      url: "/src/assets/Helmet_Bro_profileicon.png",
      id: 2,
    },
    {
      name: "Malzahar",
      url: "/src/assets/Helmet_Bro_profileicon.png",
      id: 3,
    },
    {
      name: "Lux",
      url: "/src/assets/Helmet_Bro_profileicon.png",
      id: 4,
    },
    {
      name: "Gragas",
      url: "/src/assets/Helmet_Bro_profileicon.png",
      id: 5,
    },
  ];
  return (
    <>
      <Header />
      <Title />
      <div className="page-layout">
        <Sidebar />
        {/* sort + filter and pages */}
        <div>
          <ChampDisplay champList={champList} />
        </div>
        <Banner />
      </div>
      <Footer />
    </>
  );
}
