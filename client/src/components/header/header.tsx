import { Link } from "react-router-dom";
import { initializeTheme, watchTheme, setTheme } from "../../utils/theme";
export default function Header() {
  initializeTheme();
  watchTheme();

  const toggleTheme = () => {
    if (localStorage.theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  return (
    <header className="flex-center md:mx-10">
      <nav
        className="h-[15vh] md:h-[9vh] [@media(max-height:640px)]:h-[20vh] p-3 flex-btwn grow"
        aria-label="Supplementary navigation"
      >
        <Link
          to="https://github.com/Tatadashi"
          className="header-link bg-[url(assets/github.svg)] dark:invert"
          aria-label="Github"
        ></Link>
        <div className="flex gap-x-2 md:gap-x-5">
          <button
            onClick={toggleTheme}
            className="header-link bg-[url(assets/darkMode.svg)] dark:bg-[url(assets/lightMode.svg)] dark:invert"
            aria-label="Change Theme"
          ></button>
          <Link
            to="/about"
            className="header-link bg-[url(assets/Helmet_Bro_profileicon.png)] invert dark:invert-0"
          ></Link>
        </div>
      </nav>
    </header>
  );
}
