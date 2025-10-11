import Header from "../../../components/header/header";
import Title from "../../../components/title/title";
import Sidebar from "../../../components/sidebar/sidebar";
import Banner from "../../../components/bannerArt/banner";
import Footer from "../../../components/footer/footer";

export default function Wishlist() {
  return (
    <>
      <Header />
      <Title />
      <div className="page-layout">
        <Sidebar />
        <div>
          <h1>Wishlist</h1>
        </div>
        <Banner />
      </div>
      <Footer />
    </>
  );
}
