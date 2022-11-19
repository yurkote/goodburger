import { useLayoutEffect, useState } from "react";

const isLightTheme = window?.matchMedia("(prefers-color-scheme: light").matches;
const defaultTheme = isLightTheme ? "dark" : "light";
const themeFromLS = localStorage.getItem("app-theme");

export const useTheme = () => {
  const [theme, setTheme] = useState<string>(themeFromLS || defaultTheme);

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("app-theme", theme);
  }, [theme]);

  return {theme, setTheme};
};
