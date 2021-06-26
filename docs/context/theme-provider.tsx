import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type Theme = "dark" | "light";

let ThemeContext = createContext<Theme>("light");

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  let [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    let darkTheme = window.matchMedia("(prefers-color-scheme: dark)");
    if (darkTheme.matches) {
      setTheme("dark");
    }
  }, []);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}
