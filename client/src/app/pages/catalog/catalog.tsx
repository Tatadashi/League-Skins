import Header from "../../../components/header/header";
import Title from "../../../components/title/title";
import Banner from "../../../components/bannerArt/banner";
export default function Catalog() {
  return (
    <>
      <Header />
      <Title />
      <div className="grid grid-cols-[110px_1fr_1fr] sm:grid-cols-[110px_1fr_255px] h-[1100px]">
        <div className="bg-black dark:bg-white " />
        <div />
        <Banner />
      </div>
    </>
  );
}
