//initial and watch theme works since header used every page

//saved to localStorage so user selected theme overrides system theme
export const setTheme = (theme: string) => {
  localStorage.setItem("theme", theme);
  if (theme === "dark") {
    document.body.classList.add("dark");
  } else if (theme === "light") {
    document.body.classList.remove("dark");
  }
};

//match user selected (localStorage) theme on start up or system theme if not selected
export const initializeTheme = () => {
  document.addEventListener("DOMContentLoaded", () => {
    localStorage.clear();
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  });
};

//watching to match system theme changes
export const watchTheme = () => {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
      const newColorScheme = event.matches ? "dark" : "light";
      if (newColorScheme === "dark") {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    });
};
