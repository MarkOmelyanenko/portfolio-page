import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  applyColorScheme,
  getResolvedScheme,
  getSystemScheme,
  isSchemePinned,
  toggleColorScheme,
} from "../theme";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [scheme, setScheme] = useState(() => getResolvedScheme());
  const [pinned, setPinned] = useState(() => isSchemePinned());

  useEffect(() => {
    applyColorScheme(pinned ? scheme : null);
  }, [pinned, scheme]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (!isSchemePinned()) {
        setScheme(getSystemScheme());
      }
    };

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const value = useMemo(
    () => ({
      scheme,
      pinned,
      toggleTheme() {
        const next = toggleColorScheme();
        setPinned(isSchemePinned());
        setScheme(next);
      },
    }),
    [scheme, pinned],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
