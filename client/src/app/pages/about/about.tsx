import Header from "../../../components/header/header";
import Title from "../../../components/title/title";
import Sidebar from "../../../components/sidebar/sidebar";
import Banner from "../../../components/bannerArt/banner";
import Footer from "../../../components/footer/footer";

export default function About() {
  return (
    <>
      <Header />
      <Title />
      <div className="page-layout">
        <Sidebar />
        <div className="flex items-center flex-col gap-5 sm:gap-10 md:gap-20 lg:gap-30 p-5 md:p-20 text-sm md:text-md text-center">
          <div className="text-gray-600 dark:text-gray-400">
            <p>
              I made this so that my friends and I could view League skins
              without having to login to the client. With League being my
              forever and favorite game, being able to incorporate my two main
              interests was really nice and fun. It turned out a lot better than
              I thought and I learned a lot making it. I still would like to add
              more features to it in the future and obviously keep it up to date
              per latest patch.
            </p>
            <br />
            <p>
              It is a PERN project built with TypeScript, styled with
              TailwindCSS, and formatted using ESLint and Prettier. The data is
              parsed from CommunityDragon and the Official League Wiki.
            </p>
          </div>
          <div className="font-bold">
            <h1>Credits:</h1>
            <h2>
              Programmer (Front & Back End, DB, Hosting) and Creator:{" "}
              <a
                className="link-about"
                href="https://www.linkedin.com/in/kenny-luu-kl/"
                aria-label="Kenny Luu's LinkedIn"
              >
                Kenny Luu
              </a>
            </h2>
            <h2>
              Art (Aatrox Sword and Neeko) and UI/UX:{" "}
              <a
                className="link-about"
                href="https://www.linkedin.com/in/tnn-thanh-nguyen/"
                aria-label="Thanh Nguyen's LinkedIn"
              >
                Thanh Nguyen
              </a>
            </h2>
            <br />
            <div className="font-normal">
              <h3>
                Most of icons from{" "}
                <a
                  className="link-about"
                  href="https://uxwing.com/"
                  aria-label="UXWing Website"
                >
                  UXWing
                </a>{" "}
                and{" "}
                <a
                  className="link-about"
                  href="https://devicon.dev/"
                  aria-label="Devicon Website"
                >
                  Devicon
                </a>{" "}
              </h3>
              <h3>
                Most data from{" "}
                <a
                  className="link-about"
                  href="https://www.communitydragon.org/"
                  aria-label="CommunityDragon Website"
                >
                  Community Dragon
                </a>{" "}
                Raws, please support them{" "}
                <a
                  className="link-about"
                  href="https://www.patreon.com/communitydragon"
                  aria-label="CommunityDragon Patreon"
                >
                  here
                </a>{" "}
              </h3>
              <h3>
                Helpful Discord Servers:{" "}
                <a
                  className="link-about"
                  href="https://discord.com/invite/rZQwuek"
                  aria-label="CommunityDragon Discord"
                >
                  Community Dragon
                </a>{" "}
                ,{" "}
                <a
                  className="link-about"
                  href="https://discord.com/invite/zEe6fcw6fm"
                  aria-label="Riot Wiki Discord"
                >
                  Wiki
                </a>{" "}
                ,{" "}
                <a
                  className="link-about"
                  href="https://discord.com/invite/riotgamesdevrel"
                  aria-label="Riot 3rd Party Developer Discord"
                >
                  Riot 3rd Party Developer
                </a>{" "}
              </h3>
              <h3>
                Official{" "}
                <a
                  className="link-about"
                  href="https://wiki.leagueoflegends.com/en-us/"
                  aria-label="Riot Wiki Website"
                >
                  Wiki
                </a>{" "}
                is an amazing resource
              </h3>
              <h3>
                Thanks to these cool creators:{" "}
                <a
                  className="link-about"
                  href="https://www.youtube.com/channel/UC0NwzCHb8Fg89eTB5eYX17Q"
                  aria-label="Skin Spotlights YT Channel"
                >
                  Skin Spotlights
                </a>{" "}
                and{" "}
                <a
                  className="link-about"
                  href="https://modelviewer.lol/"
                  aria-label="Khada Website"
                >
                  Khada
                </a>{" "}
              </h3>
              <h4>
                More Comprehensive info on{" "}
                <a
                  className="link-about"
                  href="https://github.com/Tatadashi/League-Skins"
                  aria-label="GitHub Repo"
                >
                  GitHub
                </a>{" "}
              </h4>
            </div>
          </div>
          <div>
            <h2>
              For any questions or suggestions, contact via{" "}
              <a
                className="link-about"
                href="https://www.linkedin.com/in/kenny-luu-kl/"
                aria-label="Kenny Luu's LinkedIn"
              >
                Kenny's LinkedIn
              </a>{" "}
              inbox
            </h2>
          </div>
        </div>
        <Banner />
      </div>
      <Footer />
    </>
  );
}
