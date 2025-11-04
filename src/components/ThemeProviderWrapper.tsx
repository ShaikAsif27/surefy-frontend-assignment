// src/components/ThemeProviderWrapper.tsx
"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

type Mode = "light" | "dark";
const ThemeModeContext = createContext<{ mode: Mode; toggle: () => void } | undefined>(undefined);

export function useThemeMode() {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) throw new Error("useThemeMode must be used within ThemeProviderWrapper");
  return ctx;
}

export default function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>(() => {
    try {
      const saved = localStorage.getItem("themeMode");
      return (saved as Mode) || "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    try { localStorage.setItem("themeMode", mode); } catch { /* ignore */ }
  }, [mode]);

  const toggle = () => setMode(m => (m === "light" ? "dark" : "light"));

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? { primary: { main: '#1976d2' } }
        : { primary: { main: '#90caf9' } })
    }
  }), [mode]);

  return (
    <ThemeModeContext.Provider value={{ mode, toggle }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
